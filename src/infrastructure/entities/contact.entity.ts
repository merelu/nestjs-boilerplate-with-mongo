import { PlatformEnum } from '@domain/common/enums/platform.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CustomSchemaOptions } from './custom.schema.option';

export type ContactDocument = Contact & Document;

@Schema(CustomSchemaOptions)
export class Contact {
  @Prop({
    type: String,
    default: null,
  })
  name: string;

  @Prop({
    type: String,
    default: null,
  })
  mobile: string;

  @Prop({
    type: String,
    default: null,
  })
  email: string;

  @Prop({
    type: String,
    default: null,
  })
  company_name: string;

  @Prop({
    type: String,
    default: null,
  })
  duty: string;

  @Prop({
    type: String,
    default: null,
  })
  project_name: string;

  @Prop({
    type: Number,
    default: null,
  })
  max_budget: number;

  @Prop({
    type: String,
    default: null,
  })
  planning_document_url: string;

  @Prop({
    type: Number,
    enum: PlatformEnum,
    default: PlatformEnum.none,
  })
  platform: PlatformEnum;

  @Prop({
    type: String,
    default: null,
  })
  brief_description: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  is_read: boolean;

  readonly created_at: Date;
  readonly updated_at: Date;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
