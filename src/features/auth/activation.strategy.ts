import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class ActivationStrategy extends PassportStrategy(Strategy, 'jwt-account-activation') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('token'),
      ignoreExpiration: true,
      secretOrKey: configService.get('jwt.accountActivation'),
    })
  }

  validate(payload: any) {
    return payload
  }
}
