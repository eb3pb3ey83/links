import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { CommonUtility } from 'src/core/utils/common.utility'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}
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
      bcc: [],
      altText: '',
    }
  }

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOne({ username })
    const { hash } = CommonUtility.encryptBySalt(password, user?.password?.salt)
    if (!user || hash !== user?.password?.hash) {
      return null
    }
    return user
  }
}
