import { registerAs } from '@nestjs/config'

export default registerAs('jwt', () => ({
  jwtSecret: process.env.JWT_SECRET,
  jwtAccountActivation: process.env.JWT_ACCOUNT_ACTIVATION,
  jwtResetPassword: process.env.JWT_RESET_PASSWORD,
}))
