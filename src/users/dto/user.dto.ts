import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'Email' })
  readonly email: string;

  @ApiProperty({ example: 'password', description: 'Password' })
  readonly password: string;
}
