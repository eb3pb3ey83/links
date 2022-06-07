import { registerAs } from '@nestjs/config'

export default registerAs('aws', () => {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID
  const secretAccessKey = encodeURIComponent(process.env.AWS_SECRET_ACCESS_KEY)
  const region = process.env.AWS_REGION
  return { accessKeyId, secretAccessKey, region }
})
