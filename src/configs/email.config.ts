import { registerAs } from '@nestjs/config'

export default registerAs('email', () => {
  const from = process.env.EMAIL_FROM
  const to = process.env.EMAIL_TO
  return { from, to }
})
