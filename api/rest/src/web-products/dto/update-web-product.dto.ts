import { PartialType } from '@nestjs/swagger';
import { CreateWebProductDto } from './create-web-product.dto';

export class UpdateWebProductDto extends PartialType(CreateWebProductDto) {}
