import { Injectable } from '@nestjs/common';
import * as tf from '@tensorflow/tfjs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invoice } from '../invoices/schema/invoices.schema';
import { Expense } from '../expenses/schema/expenses.schema';
import { Payment } from '../payments/schema/payments.schema';
import PDFDocument from 'pdfkit';
import * as ExcelJS from 'exceljs';
import { createObjectCsvStringifier } from 'csv-writer';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(Invoice.name) private invoiceModel: Model<Invoice>,
    @InjectModel(Expense.name) private expenseModel: Model<Expense>,
    @InjectModel(Payment.name) private paymentModel: Model<Payment>,
  ) {}

  async getDashboardStats(companyId: string) {
    const now = new Date();
    const lastYear = new Date(now.getFullYear() - 1, now.getMonth(), 1);

    const [invoices, expenses, payments] = await Promise.all([
      this.invoiceModel.find({ companyId, issueDate: { $gte: lastYear } }),
      this.expenseModel.find({ companyId, date: { $gte: lastYear } }),
      this.paymentModel.find({ companyId, paymentDate: { $gte: lastYear } }),
    ]);

    const monthlyData = this.processMonthlyData(invoices, expenses);
    const revenuePrediction = await this.predictFutureValue(monthlyData.map(m => m.revenue));
    const expensePrediction = await this.predictFutureValue(monthlyData.map(m => m.expenses));

    return {
      kpis: this.calculateKPIs(invoices, expenses, payments),
      monthlyData,
      predictions: {
        revenue: revenuePrediction,
        expenses: expensePrediction,
        netProfit: revenuePrediction - expensePrediction,
      },
      insights: this.calculateAdvancedInsights(monthlyData, revenuePrediction),
    };
  }

  async generatePdfReport(companyId: string): Promise<Buffer> {
    const stats = await this.getDashboardStats(companyId);
    const doc = new PDFDocument({ margin: 50 });
    const chunks: Buffer[] = [];

    return new Promise((resolve, reject) => {
      doc.on('data', (chunk: Buffer) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', (err: Error) => reject(err));

      // Header
      doc.fontSize(25).fillColor('#2c3e50').text('+Contábil - Relatório de Inteligência Financeira', { align: 'center' });
      doc.moveDown();
      doc.fontSize(12).fillColor('#7f8c8d').text(`Empresa ID: ${companyId}`, { align: 'right' });
      doc.text(`Data de Emissão: ${new Date().toLocaleDateString('pt-BR')}`, { align: 'right' });
      doc.moveDown();
      doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke('#bdc3c7');
      doc.moveDown();

      // KPIs
      doc.fontSize(18).fillColor('#2c3e50').text('Indicadores Chave (KPIs)');
      doc.moveDown(0.5);
      const kpiX = 70;
      let kpiY = doc.y;
      
      doc.fontSize(12).fillColor('#34495e');
      doc.text(`Receita Total:`, kpiX, kpiY);
      doc.text(`R$ ${stats.kpis.totalRevenue.toLocaleString('pt-BR')}`, kpiX + 150, kpiY);
      kpiY += 20;
      doc.text(`Despesas Totais:`, kpiX, kpiY);
      doc.text(`R$ ${stats.kpis.totalExpenses.toLocaleString('pt-BR')}`, kpiX + 150, kpiY);
      kpiY += 20;
      doc.text(`Lucro Líquido:`, kpiX, kpiY);
      doc.text(`R$ ${stats.kpis.netProfit.toLocaleString('pt-BR')}`, kpiX + 150, kpiY);
      kpiY += 20;
      doc.text(`Margem de Lucro:`, kpiX, kpiY);
      doc.text(`${stats.kpis.profitMargin.toFixed(2)}%`, kpiX + 150, kpiY);
      
      doc.moveDown(4);

      // Predictions (Deep Learning)
      doc.fontSize(18).fillColor('#2c3e50').text('Previsões (Deep Learning - Redes Neurais)');
      doc.moveDown(0.5);
      doc.fontSize(10).fillColor('#7f8c8d').text('Estimativas baseadas em algoritmos de aprendizado profundo processando histórico de 12 meses.');
      doc.moveDown();
      
      doc.fontSize(12).fillColor('#2980b9');
      doc.text(`Receita Estimada (Próximo Mês): R$ ${stats.predictions.revenue.toLocaleString('pt-BR')}`);
      doc.fillColor('#c0392b');
      doc.text(`Despesa Estimada (Próximo Mês): R$ ${stats.predictions.expenses.toLocaleString('pt-BR')}`);
      doc.fillColor('#27ae60');
      doc.text(`Lucro Estimado (Próximo Mês): R$ ${stats.predictions.netProfit.toLocaleString('pt-BR')}`);
      doc.moveDown();

      // Insights
      doc.fontSize(18).fillColor('#2c3e50').text('Insights e Recomendações');
      doc.moveDown(0.5);
      doc.fontSize(11).fillColor('#34495e');
      stats.insights.forEach(insight => {
        doc.text(`• ${insight}`);
        doc.moveDown(0.3);
      });
      doc.moveDown();

      // Monthly Table
      doc.fontSize(18).fillColor('#2c3e50').text('Histórico Mensal');
      doc.moveDown(0.5);
      
      // Table Header
      const tableTop = doc.y;
      doc.fontSize(10).fillColor('#2c3e50');
      doc.text('Mês', 50, tableTop);
      doc.text('Receita', 150, tableTop);
      doc.text('Despesas', 300, tableTop);
      doc.text('Saldo', 450, tableTop);
      doc.moveDown(0.5);
      doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke('#bdc3c7');
      doc.moveDown(0.5);

      stats.monthlyData.forEach(m => {
        if (doc.y > 700) doc.addPage();
        const y = doc.y;
        doc.fontSize(10).fillColor('#34495e');
        doc.text(m.month, 50, y);
        doc.text(`R$ ${m.revenue.toLocaleString('pt-BR')}`, 150, y);
        doc.text(`R$ ${m.expenses.toLocaleString('pt-BR')}`, 300, y);
        doc.text(`R$ ${(m.revenue - m.expenses).toLocaleString('pt-BR')}`, 450, y);
        doc.moveDown(0.5);
      });

      doc.end();
    });
  }

  async generateExcelReport(companyId: string): Promise<Buffer> {
    const stats = await this.getDashboardStats(companyId);
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Analytics');

    sheet.columns = [
      { header: 'Mês', key: 'month', width: 15 },
      { header: 'Receita (R$)', key: 'revenue', width: 20 },
      { header: 'Despesas (R$)', key: 'expenses', width: 20 },
      { header: 'Saldo (R$)', key: 'balance', width: 20 },
    ];

    stats.monthlyData.forEach(m => {
      sheet.addRow({
        ...m,
        balance: m.revenue - m.expenses,
      });
    });

    // Add Predictions
    sheet.addRow({});
    sheet.addRow({ month: 'PREVISÃO (IA)', revenue: stats.predictions.revenue, expenses: stats.predictions.expenses, balance: stats.predictions.netProfit });

    const buffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(buffer);
  }

  async generateCsvReport(companyId: string): Promise<string> {
    const stats = await this.getDashboardStats(companyId);
    const csvStringifier = createObjectCsvStringifier({
      header: [
        { id: 'month', title: 'Mês' },
        { id: 'revenue', title: 'Receita' },
        { id: 'expenses', title: 'Despesas' },
        { id: 'balance', title: 'Saldo' },
      ]
    });

    const records = stats.monthlyData.map(m => ({
      ...m,
      balance: m.revenue - m.expenses,
    }));

    records.push({
      month: 'PREVISAO_PROX_MES',
      revenue: stats.predictions.revenue,
      expenses: stats.predictions.expenses,
      balance: stats.predictions.netProfit,
    } as any);

    return csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(records);
  }

  private calculateKPIs(invoices: any[], expenses: any[], payments: any[]) {
    const totalRevenue = invoices.reduce((acc, inv) => acc + (inv.amount || 0), 0);
    const totalExpenses = expenses.reduce((acc, exp) => acc + (exp.amount || 0), 0);
    const netProfit = totalRevenue - totalExpenses;
    const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;

    return {
      totalRevenue,
      totalExpenses,
      netProfit,
      profitMargin,
      avgInvoiceValue: invoices.length > 0 ? totalRevenue / invoices.length : 0,
      expenseRatio: totalRevenue > 0 ? (totalExpenses / totalRevenue) * 100 : 0,
    };
  }

  private processMonthlyData(invoices: any[], expenses: any[]) {
    const months: any[] = [];
    const now = new Date();
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthLabel = d.toLocaleString('pt-BR', { month: 'short', year: '2-digit' });
      months.push({
        month: monthLabel,
        revenue: 0,
        expenses: 0,
        timestamp: d.getTime(),
        monthNum: d.getMonth(),
        yearNum: d.getFullYear(),
      });
    }

    invoices.forEach(inv => {
      const d = new Date(inv.issueDate || inv.createdAt);
      const index = months.findIndex(m => m.monthNum === d.getMonth() && m.yearNum === d.getFullYear());
      if (index !== -1) months[index].revenue += inv.amount || 0;
    });

    expenses.forEach(exp => {
      const d = new Date(exp.date || exp.createdAt);
      const index = months.findIndex(m => m.monthNum === d.getMonth() && m.yearNum === d.getFullYear());
      if (index !== -1) months[index].expenses += exp.amount || 0;
    });

    return months;
  }

  private async predictFutureValue(data: number[]): Promise<number> {
    if (data.length < 3) return 0;

    // Normalization
    const maxVal = Math.max(...data, 1);
    const normalizedData = data.map(v => v / maxVal);

    // Deep Learning Model (MLP)
    const xs = tf.tensor2d(data.map((_, i) => [i / data.length]));
    const ys = tf.tensor2d(normalizedData.map(v => [v]));

    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 8, activation: 'relu', inputShape: [1] }));
    model.add(tf.layers.dense({ units: 4, activation: 'relu' }));
    model.add(tf.layers.dense({ units: 1, activation: 'linear' }));

    model.compile({ loss: 'meanSquaredError', optimizer: tf.train.adam(0.01) });

    await model.fit(xs, ys, { epochs: 150, verbose: 0 });

    const nextIdx = tf.tensor2d([[1]]);
    const prediction = model.predict(nextIdx) as tf.Tensor;
    const value = (await prediction.data())[0];

    // Cleanup
    xs.dispose();
    ys.dispose();
    nextIdx.dispose();
    prediction.dispose();

    return Math.max(0, value * maxVal);
  }

  private calculateAdvancedInsights(monthlyData: any[], predictedRevenue: number): string[] {
    const insights = [];
    const lastMonth = monthlyData[monthlyData.length - 1];
    const prevMonth = monthlyData[monthlyData.length - 2];

    // Revenue trend
    if (lastMonth.revenue > prevMonth.revenue) {
      const growth = ((lastMonth.revenue - prevMonth.revenue) / prevMonth.revenue) * 100;
      insights.push(`Crescimento de receita de ${growth.toFixed(1)}% em relação ao mês anterior.`);
    } else if (lastMonth.revenue < prevMonth.revenue) {
      insights.push(`Queda de receita detectada. Sugerimos revisar o funil de vendas.`);
    }

    // Expense alert
    if (lastMonth.expenses > lastMonth.revenue) {
      insights.push(`Alerta: Despesas superaram a receita no último mês. Risco de déficit.`);
    }

    // Prediction insight
    if (predictedRevenue > lastMonth.revenue) {
      insights.push(`Tendência de alta: A IA prevê um aumento de receita para o próximo mês.`);
    } else {
      insights.push(`Tendência de estabilidade ou queda: Prepare reservas financeiras.`);
    }

    // Efficiency
    const efficiency = lastMonth.revenue > 0 ? (lastMonth.revenue - lastMonth.expenses) / lastMonth.revenue : 0;
    if (efficiency > 0.3) {
      insights.push(`Alta eficiência operacional (margem > 30%). Bom momento para investimentos.`);
    }

    return insights;
  }
}
