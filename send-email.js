import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendEmail = async (presignedURL) => {
 sgMail.sendMultiple()
 const sent = await sgMail.send({
  from: "zoom@kshitizagrawal.in",
  to: ["sanjeev@dreamsoft4u.com", "kshitizagrawal@outlook.com"],
  subject: "Your Zoom Download is Ready",
  text: `Your Zoom Download is Ready, Click the link below to download it \n" + ${presignedURL}. The link is only valid for 7 days.`,
  html: "<strong>Your Zoom Download is Ready, Click the link below to download it</strong> <br> <a href='" + presignedURL + "'>Download</a> <br> The link is only valid for 7 days."
 })

 console.log("Email sent")

 console.log(sent)
 return sent
}

export { sendEmail }