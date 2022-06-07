import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

export type CategoryDocument = Category & Document

@Schema({ timestamps: true })
export class Category {
  @Prop({
    trim: true,
    required: true,
    max: 32,
  })
  name: string

  @Prop({
    lowercase: true,
    unique: true,
    index: true,
  })
  slug: string

  @Prop({
    url: String,
    key: String,
  })
  image: string

  // @Prop({
  //   type: {},
  //   min: 20,
  //   max: 2000000,
  // })
  // content: {}

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
  })
  postedBy: Types.ObjectId
}
