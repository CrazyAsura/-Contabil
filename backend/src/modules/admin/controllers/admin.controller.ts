import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { AdminService } from '../services/admin.service';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { AuditLogInterceptor } from '../../../common/interceptors/audit-log.interceptor';

@Controller('admin')
@UseGuards(RolesGuard)
@UseInterceptors(AuditLogInterceptor)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('stats')
  @Roles('SUPER_ADMIN')
  getStats() {
    return this.adminService.getGlobalStats();
  }

  @Get('companies')
  @Roles('SUPER_ADMIN')
  getCompanies() {
    return this.adminService.getAllCompanies();
  }

  @Get('users')
  @Roles('SUPER_ADMIN')
  getUsers() {
    return this.adminService.getAllUsers();
  }
}
