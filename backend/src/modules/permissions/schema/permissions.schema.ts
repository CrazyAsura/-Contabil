import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'permissions' })
export class Permission extends Document {
  @Prop({ required: true, unique: true })
  name: string; // e.g., 'create:user', 'delete:expense'

  @Prop()
  description: string;

  @Prop({ type: [String], default: [] })
  roles: string[]; // e.g., ['ADMIN', 'MANAGER']
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
