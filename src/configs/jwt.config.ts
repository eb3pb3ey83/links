import { registerAs } from '@nestjs/config'
export default registerAs('jwt', () => {
  const secret = process.env.JWT_SECRET
  const accountActivation = encodeURIComponent(process.env.JWT_ACCOUNT_ACTIVATION)
  const resetPassword = process.env.JWT_RESET_PASSWORD
  return { secret, accountActivation, resetPassword }
})
