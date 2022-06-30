import { UserException } from './../../core/exceptions/user.exception'
import { Body, Controller, Post, Put, Req, UseGuards } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '../user/user.service'
import { CreateUserDto } from 'src/features/user/create-user-dto'
import { EmailException } from 'src/core/exceptions/email.exception'
import { AuthService } from 'src/features/auth/auth.service'
import { ConfigService } from '@nestjs/config'
import { AuthGuard } from '@nestjs/passport'
import { TypeGuardService } from 'src/common/services/type-guard.service'
import { TokenException } from 'src/core/exceptions/token.exception'
import { UserDocument } from '../user/user.schema'
import { safeAwait } from 'src/common/helpers/safewait'
import { ResetException } from 'src/core/exceptions/reset.exception'
import { CommonUtility } from 'src/core/utils/common.utility'

@Controller()
export class AuthController {
  constructor(
    private typeGuardService: TypeGuardService,
    private userService: UserService,
    private jwtService: JwtService,
    private authService: AuthService,
    private configService: ConfigService,
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

    return this.authService.registerPasswordEmailService(email, params)
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

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() request: { user: UserDocument }) {
    const { _id, name, email, role } = request.user
    const token = this.jwtService.sign({ _id }, { secret: this.configService.get('jwt.secret'), expiresIn: '60s' })
    return { token, user: { _id, name, email, role } }
  }

  @Put('forgot-password')
  async forgotPassword(@Body() { email }: { email: string }) {
    const user = await this.userService.findOne({ email })

    if (!user) {
      throw new UserException()
    }

    const token = this.jwtService.sign({ name: user.name }, { secret: this.configService.get('jwt.resetPassword') })
    const params = this.authService.forgotPasswordParams(email, token)

    const [resetError] = await safeAwait(this.userService.updateResetPasswordLink(token))

    if (resetError) {
      throw new ResetException()
    }

    return this.authService.forgotPasswordEmailService(email, params)
  }

  @Put('reset-password')
  async resetPassword(@Body() { token, newPassword }: { token: string; newPassword: string }) {
    const [tokenError] = await safeAwait(this.jwtService.verifyAsync(token, { secret: this.configService.get('jwt.resetPassword') }))
    const [userError] = await safeAwait(this.userService.findOne({ resetPasswordLink: token }))

    if (tokenError) {
      throw new TokenException()
    }

    if (userError) {
      throw new UserException()
    }

    const encryptedPassword = CommonUtility.encryptBySalt(newPassword)

    await this.userService.updateOne({
      password: encryptedPassword,
      resetPasswordLink: '',
    })

    return {
      message: 'Great! Now you can login with your new password',
    }
  }
}
