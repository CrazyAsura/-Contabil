import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SectorsGuard } from '../../common/guards/sectors.guard';
import { Sectors } from '../../common/decorators/sectors.decorator';

@Controller('reports')
@UseGuards(JwtAuthGuard, SectorsGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  @Sectors('Contábil')
  create(@Body() createReportDto: CreateReportDto) {
    return this.reportsService.create(createReportDto);
  }

  @Get()
  @Sectors('Contábil')
  findAll() {
    return this.reportsService.findAll();
  }

  @Get(':id')
  @Sectors('Contábil')
  findOne(@Param('id') id: string) {
    return this.reportsService.findOne(id);
  }

  @Get('company/:companyId')
  @Sectors('Contábil')
  findByCompany(@Param('companyId') companyId: string) {
    return this.reportsService.findByCompany(companyId);
  }

  @Patch(':id')
  @Sectors('Contábil')
  update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
    return this.reportsService.update(id, updateReportDto);
  }

  @Delete(':id')
  @Sectors('Contábil')
  remove(@Param('id') id: string) {
    return this.reportsService.remove(id);
  }
}
