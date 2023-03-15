import { InputType, PartialType } from '@nestjs/graphql';
import { SettingsOptions } from '../entities/setting.entity';

@InputType()
export class SettingsInput {
  options: SettingsOptionsInput;
  language?: string;
}

@InputType()
export class SettingsOptionsInput extends PartialType(SettingsOptions) {}
