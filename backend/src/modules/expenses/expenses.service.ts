import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './schema/expenses.schema';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectModel(Expense.name) private expenseModel: Model<Expense>,
  ) {}

  async create(createExpenseDto: CreateExpenseDto): Promise<Expense> {
    const createdExpense = new this.expenseModel(createExpenseDto);
    return createdExpense.save();
  }

  async findAll(): Promise<Expense[]> {
    return this.expenseModel.find().populate('companyId').exec();
  }

  async findByCompany(companyId: string): Promise<Expense[]> {
    return this.expenseModel.find({ companyId }).exec();
  }

  async findOne(id: string): Promise<Expense | null> {
    return this.expenseModel.findById(id).populate('companyId').exec();
  }

  async update(id: string, updateExpenseDto: UpdateExpenseDto): Promise<Expense | null> {
    return this.expenseModel
      .findByIdAndUpdate(id, updateExpenseDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Expense | null> {
    return this.expenseModel.findByIdAndDelete(id).exec();
  }
}
