import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'Email' })
  readonly email: string;

  @ApiProperty({ example: 'password', description: 'Password' })
  readonly password: string;

  @ApiProperty({ example: 'John', description: 'First name' })
  readonly firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name' })
  readonly lastName: string;

  @ApiProperty({ example: 'John', description: 'First name of the child' })
  @IsOptional()
  readonly firstNameChild?: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the child' })
  @IsOptional()
  readonly lastNameChild?: string;

  @ApiProperty({ example: 'Street', description: 'Street' })
  readonly street: string;

  @ApiProperty({ example: '1', description: 'Number' })
  readonly number: string;

  @ApiProperty({ example: '12345', description: 'Postal code' })
  readonly postalCode: string;

  @ApiProperty({ example: 'City', description: 'City' })
  readonly city: string;

  @ApiProperty({ example: 'School', description: 'School' })
  readonly school: string;

  @ApiProperty({ example: '1', description: 'Class' })
  @IsOptional()
  readonly class?: string;

  @ApiProperty({ example: 'A', description: 'Letter' })
  @IsOptional()
  readonly letter?: string;
}
