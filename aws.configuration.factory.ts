import { registerAs } from '@nestjs/config'

export default registerAs('aws', () => ({
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
}))
