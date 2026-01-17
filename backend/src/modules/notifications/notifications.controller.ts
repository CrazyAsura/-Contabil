import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Request,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('notifications')
@UseGuards(JwtAuthGuard, RolesGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  @Roles('SUPER_ADMIN', 'EMPLOYEE')
  create(@Request() req: any, @Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto, req.user.userId, req.user.role);
  }

  @Get()
  findAll(@Request() req: any, @Query() query: any) {
    // Se não for admin, limitamos o que pode ser visto
    if (req.user.role !== 'SUPER_ADMIN') {
      // Se for funcionário (suporte), ele pode ver as que ele enviou ou as que ele recebeu
      if (req.user.role === 'EMPLOYEE') {
        // Se estiver explicitamente buscando o que ele enviou, permitimos
        if (query.senderId === req.user.userId) {
          query.senderId = req.user.userId;
        } else {
          // Caso contrário, ele vê o que foi enviado para ele
          query.recipientId = req.user.userId;
        }
      } else {
        // Usuário comum só vê o que foi enviado para ele
        query.recipientId = req.user.userId;
      }
    }
    return this.notificationsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationsService.findOne(id);
  }

  @Patch(':id')
  @Roles('SUPER_ADMIN', 'EMPLOYEE')
  update(
    @Request() req: any,
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    return this.notificationsService.update(id, updateNotificationDto, req.user.userId, req.user.role);
  }

  @Patch(':id/read')
  markAsRead(@Request() req: any, @Param('id') id: string) {
    return this.notificationsService.markAsRead(id, req.user.userId);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN', 'EMPLOYEE')
  remove(@Request() req: any, @Param('id') id: string) {
    return this.notificationsService.remove(id, req.user.userId, req.user.role);
  }
}
