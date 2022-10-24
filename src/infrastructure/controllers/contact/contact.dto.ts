import { PlatformEnum } from '@domain/common/enums/platform.enum';
import { IAddContactDto } from '@domain/dto/contact.dto.interface';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class AddContactDto implements IAddContactDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  mobile: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  company_name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  duty: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  project_name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  max_budget: number;

  @ApiProperty({ required: true })
  @IsOptional()
  @IsString()
  planning_document_url: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @Type(() => Number)
  @IsEnum(PlatformEnum)
  @IsNumber()
  platform: PlatformEnum;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  brief_description: string;
}
