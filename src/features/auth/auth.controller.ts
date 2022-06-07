import { Body, Controller, Post } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { SesService } from '@nextnm/nestjs-ses'
import { UserService } from '../user/user.service'
import { CreateUserDto } from 'src/features/user/create-user-dto'
import { EmailException } from 'src/core/exceptions/email.exception'
import { AuthService } from 'src/features/auth/auth.service'

@Controller()
export class AuthController {
  constructor(private userService: UserService, private jwtService: JwtService, private authService: AuthService, private sesService: SesService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const { name, email, password, categories } = createUserDto
    const user = await this.userService.findOne({ email })

    if (user) {
      throw new EmailException()
    }

    const token = this.jwtService.sign(
      {
        name,
        email,
        password,
        categories,
      },
      { secret: process.env.JWT_ACCOUNT_ACTIVATION },
    )

    const params = this.authService.registerEmailParams(email, token)

    return this.sesService
      .sendEmail(params)
      .then(() => ({
        message: `Email has been sent to ${email}, Follow the instructions to complete your registration`,
      }))
      .catch(() => ({
        message: `We could not verify your email. Please try again`,
      }))
  }

  // @Post('register/activate')
  // registerActivate() {}

  // @Post('login')
  // login() {}

  // @Put('forgot-password')
  // forgotPassword() {}

  // @Put('reset-password')
  // reserPassword() {}
}
