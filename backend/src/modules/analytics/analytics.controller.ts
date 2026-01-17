import { Controller, Get, Param, UseGuards, Res } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { Response } from 'express';

@Controller('analytics')
@UseGuards(JwtAuthGuard)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('dashboard/:companyId')
  async getDashboardStats(@Param('companyId') companyId: string) {
    return this.analyticsService.getDashboardStats(companyId);
  }

  @Get('export/pdf/:companyId')
  async exportPdf(@Param('companyId') companyId: string, @Res() res: Response) {
    const buffer = await this.analyticsService.generatePdfReport(companyId);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=relatorio_financeiro_${companyId}.pdf`,
      'Content-Length': buffer.length,
    });
    res.end(buffer);
  }

  @Get('export/excel/:companyId')
  async exportExcel(@Param('companyId') companyId: string, @Res() res: Response) {
    const buffer = await this.analyticsService.generateExcelReport(companyId);
    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename=relatorio_financeiro_${companyId}.xlsx`,
      'Content-Length': buffer.length,
    });
    res.end(buffer);
  }

  @Get('export/csv/:companyId')
  async exportCsv(@Param('companyId') companyId: string, @Res() res: Response) {
    const csvData = await this.analyticsService.generateCsvReport(companyId);
    res.set({
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename=relatorio_financeiro_${companyId}.csv`,
    });
    res.send(csvData);
  }
}
