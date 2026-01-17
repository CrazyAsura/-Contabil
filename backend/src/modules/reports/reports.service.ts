import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { Report } from './schema/reports.schema';

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(Report.name) private reportModel: Model<Report>,
  ) {}

  async create(createReportDto: CreateReportDto): Promise<Report> {
    const createdReport = new this.reportModel(createReportDto);
    return createdReport.save();
  }

  async findAll(): Promise<Report[]> {
    return this.reportModel.find().populate('companyId').exec();
  }

  async findByCompany(companyId: string): Promise<Report[]> {
    return this.reportModel.find({ companyId }).exec();
  }

  async findOne(id: string): Promise<Report | null> {
    return this.reportModel.findById(id).populate('companyId').exec();
  }

  async update(id: string, updateReportDto: UpdateReportDto): Promise<Report | null> {
    return this.reportModel
      .findByIdAndUpdate(id, updateReportDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Report | null> {
    return this.reportModel.findByIdAndDelete(id).exec();
  }
}
