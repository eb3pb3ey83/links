import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name is required' })
  readonly name: string
  @IsEmail({}, { message: 'Must be a valid email address' })
  readonly email: string
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  readonly password: string
  @MinLength(6, { message: 'Pick at aleast one category' })
  readonly categories: string
}
