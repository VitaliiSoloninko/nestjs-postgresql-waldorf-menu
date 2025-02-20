import { ApiProperty } from '@nestjs/swagger';

export class UpdateFoodDto {
  @ApiProperty({ example: 'Food', description: 'Name of the food' })
  readonly name: string;

  @ApiProperty({ example: '1', description: 'Day' })
  readonly day: string;

  @ApiProperty({ example: '1', description: 'Week' })
  readonly week: string;

  @ApiProperty({ example: '4', description: 'Price' })
  readonly price: string;

  @ApiProperty({
    example: 'Sandwich',
    description: 'Description of the food',
  })
  readonly description: string;

  @ApiProperty({ example: '01.jpg', description: 'Image of the food' })
  readonly image: string;
}
