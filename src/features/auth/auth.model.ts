export interface EmailService {
  from: string
  to: string
  subject: string
  html: string
  replyTo: string
  cc: string
  altText: string
}
