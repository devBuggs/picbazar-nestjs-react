import { PartialType } from '@nestjs/swagger';
import { CreatePosProductDto } from './create-pos-product.dto';

export class UpdatePosProductDto extends PartialType(CreatePosProductDto) {}
