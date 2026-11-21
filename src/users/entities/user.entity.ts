import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({
    type: String,
    // required: true,÷
    trim: true,
  })
  name: string | undefined;

  @Prop({
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  })
  email: string | undefined;

  @Prop({
    required: true,
    type: String,
    select: true,
  })
  password: string | undefined;

  @Prop({
    type: String,
    default: null,
  })
  avatar: string | undefined;
}

export const UserSchema = SchemaFactory.createForClass(User);