import { registerAs } from '@nestjs/config'

export default registerAs('email', () => ({
  emailFrom: process.env.EMAIL_FROM,
  emailTo: process.env.EMAIL_TO,
}))
