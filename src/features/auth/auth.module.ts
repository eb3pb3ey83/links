import { UserModule } from '../user/user.module'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { Module } from '@nestjs/common'
import { SesModule } from '@nextnm/nestjs-ses'
import { JwtModule } from '@nestjs/jwt'
import { UserService } from 'src/features/user/user.service'
import { LocalStrategy } from './local.strategy'

@Module({
  imports: [
    UserModule,
    SesModule.forRoot({
      SECRET: '5ThC0Ul0AvUpuxUaaI1F15fU+9ScAOSdvDX8fIFK',
      AKI_KEY: 'AKIAUU76LOZWBJMXWQXO',
      REGION: 'us-east-1',
    }),
    JwtModule.register({ secret: 'JKDFKJU438094304HUH3IUHUI' }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStrategy],
})
export class AuthModule {}
