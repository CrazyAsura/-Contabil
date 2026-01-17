import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminService } from './services/admin.service';
import { AdminController } from './controllers/admin.controller';
import { Company, CompanySchema } from '../companies/schema/companies.schema';
import { User, UserSchema } from '../users/schema/users.schema';
import { Revenue, RevenueSchema } from '../revenue/schema/revenue.schema';
import { Expense, ExpenseSchema } from '../expenses/schema/expenses.schema';
import { AuditLogModule } from '../audit-logs/audit-logs.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Company.name, schema: CompanySchema },
      { name: User.name, schema: UserSchema },
      { name: Revenue.name, schema: RevenueSchema },
      { name: Expense.name, schema: ExpenseSchema },
    ]),
    AuditLogModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
