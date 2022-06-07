import { Prop, Schema, SchemaFactory, raw, ModelDefinition } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

export type UserDocument = User & Document

@Schema({ timestamps: true })
export class User {
  @Prop({
    trim: true,
    max: 12,
    unique: true,
    index: true,
    lowercase: true,
  })
  username?: string

  @Prop({
    trim: true,
    max: 32,
  })
  name?: string

  @Prop({
    trim: true,
    unique: true,
    lowercase: true,
  })
  email?: string

  @Prop({
    type: raw({
      hash: String,
      salt: String,
    }),
    required: true,
  })
  password: Record<string, any>

  @Prop()
  salt?: string

  @Prop({ default: 'subscriber' })
  role?: string

  @Prop({ default: '' })
  resetPasswordLink?: string

  @Prop([
    {
      type: Types.ObjectId,
      ref: 'Category',
    },
  ])
  categories?: Types.ObjectId[]
}

export const UserSchema = SchemaFactory.createForClass(User)

export interface UserRequest extends User {
  id: number
}

export type CurrentUser = User &
  Document<any, any, any> & {
    _id: any
  }

export const USER_MODEL_TOKEN = User.name

export const UserDefinition: ModelDefinition = {
  name: USER_MODEL_TOKEN,
  schema: UserSchema,
}
