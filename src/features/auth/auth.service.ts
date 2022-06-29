import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { SesService } from '@nextnm/nestjs-ses'
import { CommonUtility } from 'src/core/utils/common.utility'
import { UserDocument } from '../user/user.schema'
import { UserService } from '../user/user.service'
import { EmailService } from './auth.model'

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService, private sesService: SesService) {}
  public registerEmailParams(email: string, token: string) {
    return {
      from: 'samuel.zhuang@cloud-interactive.com',
      to: email,
      subject: 'Complete your registration',
      html: `
        <html>
            <h1>Vefiry your email address</h1>
            <p>Please use the following link to complete your registration:</p>
            <p>test/auth/activate/${token}</p>
        </html>
      `,
      replyTo: '',
      cc: '',
      altText: '',
    }
  }

  public forgotPasswordParams(email: string, token: string) {
    return {
      from: 'samuel.zhuang@cloud-interactive.com',
      to: email,
      subject: 'Password reset link',
      html: `
        <html>
            <h1>Vefiry your email address</h1>
            <p>Please use the following link to reset your password:</p>
            <p>test/auth/activate/${token}</p>
        </html>
      `,
      replyTo: '',
      cc: '',
      altText: '',
    }
  }

  public registerPasswordEmailService(email: string, params: EmailService) {
    return this.sesService
      .sendEmail(params)
      .then(() => ({
        message: `Email has been sent to ${email}, Follow the instructions to complete your registration`,
      }))
      .catch(() => ({
        message: `We could not verify your email. Please try again`,
      }))
  }

  public forgotPasswordEmailService(email: string, params: EmailService) {
    return this.sesService
      .sendEmail(params)
      .then(() => ({
        message: `Email has been sent to ${email}, Follow the instructions to complete your registration`,
      }))
      .catch(() => ({
        message: `We could not verify your email. Please try again`,
      }))
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne({ email })
    const { hash } = CommonUtility.encryptBySalt(password, user?.password?.salt)

    if (!user) {
      return 'user error'
    } else if (hash !== user?.password?.hash) {
      return 'password error'
    }

    return user
  }

  generateJwt(user: UserDocument) {
    const { _id: id, username } = user
    const payload = { id, username }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
