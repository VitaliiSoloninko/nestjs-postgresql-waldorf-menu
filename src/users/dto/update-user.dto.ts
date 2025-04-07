import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'user@gmail.com', description: 'Email' })
  readonly email: string;

  @ApiProperty({ example: 'password', description: 'Password' })
  readonly password: string;

  @ApiProperty({ example: 'John', description: 'First name' })
  readonly firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name' })
  readonly lastName: string;

  @ApiProperty({ example: 'John', description: 'First name of the child' })
  readonly firstNameChild: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the child' })
  readonly lastNameChild: string;

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
  readonly class: string;

  @ApiProperty({ example: 'A', description: 'Letter' })
  readonly letter: string;

  // @ApiProperty({ example: 'true', description: 'Is address confirmed' })
  // readonly emailConfirmed: boolean;

  // @ApiProperty({ example: 'true', description: 'Is address confirmed' })
  // readonly addressConfirmed: boolean;
}
