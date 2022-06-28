import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { EmailException } from 'src/core/exceptions/email.exception'
import { AuthService } from './auth.service'

@Injectable()
export class EmailStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    })
  }

  async validate(email: string, password: string) {
    const response = await this.authService.validateUser(email, password)
    const isUserError = response === 'user error'

    if (isUserError) {
      throw new EmailException()
    }

    return response
  }
}
