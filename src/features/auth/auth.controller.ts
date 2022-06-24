import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { SesService } from '@nextnm/nestjs-ses'
import { UserService } from '../user/user.service'
import { CreateUserDto } from 'src/features/user/create-user-dto'
import { EmailException } from 'src/core/exceptions/email.exception'
import { AuthService } from 'src/features/auth/auth.service'
import { ConfigService } from '@nestjs/config'
import { AuthGuard } from '@nestjs/passport'
import { TypeGuardService } from 'src/common/services/type-guard.service'
import { TokenException } from 'src/core/exceptions/token.exception'
import { User, UserDocument, USER_MODEL_TOKEN } from '../user/user.schema'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'

@Controller()
export class AuthController {
  constructor(
    private typeGuardService: TypeGuardService,
    private userService: UserService,
    private jwtService: JwtService,
    private authService: AuthService,
    private sesService: SesService,
    private configService: ConfigService,
    @InjectModel(USER_MODEL_TOKEN)
    private readonly userModel: Model<UserDocument>,
  ) {}

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
      { secret: this.configService.get('jwt.accountActivation'), expiresIn: '60s' },
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

  @Post('register/activate')
  @UseGuards(AuthGuard('jwt-account-activation'))
  async registerActivate(@Body() body: { token: string }) {
    const userData = this.jwtService.decode(body.token)

    if (this.typeGuardService.isString(userData)) {
      throw new TokenException()
    }

    const { email } = userData

    const user = await this.userService.findOne({ email })

    if (user) {
      throw new EmailException()
    }

    this.userService.createUser(userData)
  }

  // @Post('login')
  // login() {}

  // @Put('forgot-password')
  // forgotPassword() {}

  // @Put('reset-password')
  // reserPassword() {}
}
