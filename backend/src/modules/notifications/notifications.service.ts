import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Notification } from './schema/notifications.schema';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name) private notificationModel: Model<Notification>,
  ) {}

  async create(createNotificationDto: CreateNotificationDto, senderId: string, senderRole: string) {
    const type = senderRole === 'SUPER_ADMIN' ? 'ADMIN' : 'SUPPORT';
    const notification = new this.notificationModel({
      ...createNotificationDto,
      senderId: new Types.ObjectId(senderId),
      recipientId: new Types.ObjectId(createNotificationDto.recipientId),
      type,
    });
    return notification.save();
  }

  async findAll(query: any) {
    const { page = 1, limit = 10, recipientId, senderId, type, read } = query;
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (recipientId) filter.recipientId = new Types.ObjectId(recipientId);
    if (senderId) filter.senderId = new Types.ObjectId(senderId);
    if (type) filter.type = type;
    if (read !== undefined) filter.read = read === 'true';

    const [items, total] = await Promise.all([
      this.notificationModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .populate('senderId', 'name email')
        .populate('recipientId', 'name email')
        .exec(),
      this.notificationModel.countDocuments(filter),
    ]);

    return {
      items,
      total,
      page: Number(page),
      lastPage: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const notification = await this.notificationModel.findById(id).exec();
    if (!notification) {
      throw new NotFoundException('Notificação não encontrada');
    }
    return notification;
  }

  async update(id: string, updateNotificationDto: UpdateNotificationDto, userId: string, userRole: string) {
    const notification = await this.findOne(id);

    if (userRole !== 'SUPER_ADMIN' && notification.senderId.toString() !== userId) {
      throw new ForbiddenException('Você não tem permissão para alterar esta notificação');
    }

    return this.notificationModel.findByIdAndUpdate(id, updateNotificationDto, { new: true }).exec();
  }

  async remove(id: string, userId: string, userRole: string) {
    const notification = await this.findOne(id);

    if (userRole !== 'SUPER_ADMIN' && notification.senderId.toString() !== userId) {
      throw new ForbiddenException('Você não tem permissão para excluir esta notificação');
    }

    return this.notificationModel.findByIdAndDelete(id).exec();
  }

  async markAsRead(id: string, recipientId: string) {
    const notification = await this.findOne(id);
    if (notification.recipientId.toString() !== recipientId) {
      throw new ForbiddenException('Você não tem permissão para marcar esta notificação como lida');
    }
    notification.read = true;
    return notification.save();
  }
}
