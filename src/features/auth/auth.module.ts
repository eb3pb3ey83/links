import { UserModule } from '../user/user.module'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { Module } from '@nestjs/common'
import { SesModule } from '@nextnm/nestjs-ses'
import { JwtModule } from '@nestjs/jwt'
import { UserService } from 'src/features/user/user.service'
import { LocalStrategy } from './local.strategy'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    UserModule,
    SesModule.forRoot({
      SECRET: '5ThC0Ul0AvUpuxUaaI1F15fU+9ScAOSdvDX8fIFK',
      AKI_KEY: 'AKIAUU76LOZWBJMXWQXO',
      REGION: 'us-east-1',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const secret = config.get('jwt.secret')
        return {
          secret,
          signOptions: {
            expiresIn: '60s',
          },
        }
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStrategy],
})
export class AuthModule {}
