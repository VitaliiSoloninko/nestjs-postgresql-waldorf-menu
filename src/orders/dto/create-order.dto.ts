import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ example: 'Food', description: 'Food ID' })
  readonly foodId: number;

  @ApiProperty({ example: 'Menu 1', description: 'Menu number' })
  readonly name: string;

  @ApiProperty({ example: 4, description: 'Food price' })
  readonly price: number;

  @ApiProperty({ example: '11.03.2025', description: 'Date' })
  readonly date: string;

  @ApiProperty({ example: '1', description: 'User ID' })
  readonly userId: number;

  @ApiProperty({ example: '11', description: 'Day' })
  readonly day: number;

  @ApiProperty({ example: '11', description: 'Week' })
  readonly week: number;

  @ApiProperty({ example: '03', description: 'Month' })
  readonly month: number;

  @ApiProperty({ example: '2025', description: 'Year' })
  readonly year: number;

  @ApiProperty({ example: true, description: 'Ordered' })
  readonly ordered: boolean;
}
