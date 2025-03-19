import { PartialType } from '@nestjs/swagger';
import { CreateUserOrderDto } from './create-user-order.dto';

export class UpdateUserOrderDto extends PartialType(CreateUserOrderDto) {}
