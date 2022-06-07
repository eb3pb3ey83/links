import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

export type LinkDocument = Link & Document

@Schema({ timestamps: true })
export class Link {
  @Prop({
    trim: true,
    required: true,
    max: 256,
  })
  title: string

  @Prop({
    trim: true,
    required: true,
    max: 256,
  })
  url: string

  @Prop({
    lowercase: true,
    required: true,
    index: true,
  })
  slug: string

  @Prop({ ref: 'User' })
  postedBy: Types.ObjectId

  @Prop([
    {
      ref: 'Category',
      required: true,
    },
  ])
  categories: Types.ObjectId[]

  @Prop({ default: 'Free' })
  type: string

  @Prop({ default: 'Video' })
  medium: string

  @Prop({ default: 0 })
  clicks: number
}

export const LinkSchema = SchemaFactory.createForClass(Link)
