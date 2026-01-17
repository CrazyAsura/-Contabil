import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company } from '../../companies/schema/companies.schema';
import { User } from '../../users/schema/users.schema';
import { Revenue } from '../../revenue/schema/revenue.schema';
import { Expense } from '../../expenses/schema/expenses.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<Company>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Revenue.name) private revenueModel: Model<Revenue>,
    @InjectModel(Expense.name) private expenseModel: Model<Expense>,
  ) {}

  async getGlobalStats() {
    const [
      totalCompanies,
      totalUsers,
      revenueStats,
      expenseStats,
    ] = await Promise.all([
      this.companyModel.countDocuments(),
      this.userModel.countDocuments(),
      this.revenueModel.aggregate([
        { $group: { _id: '$currency', total: { $sum: '$amount' } } },
      ]),
      this.expenseModel.aggregate([
        { $group: { _id: '$currency', total: { $sum: '$amount' } } },
      ]),
    ]);

    return {
      totalCompanies,
      totalUsers,
      revenueByCurrency: revenueStats,
      expensesByCurrency: expenseStats,
    };
  }

  async getAllCompanies() {
    return this.companyModel.find().exec();
  }

  async getAllUsers() {
    return this.userModel.find().populate('companyId').exec();
  }
}
