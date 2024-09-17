import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendEmail = async (presignedURL) => {
 const msg = {
  from: "zoom@kshitizagrawal.in",
  to: "sanjeev@dreamsoft4u.com",
  subject: "Your Zoom Download is Ready",
  text: "Your Zoom Download is Ready, Click the link below to download it \n" + presignedURL,
  html: "<strong>Your Zoom Download is Ready, Click the link below to download it</strong> <br> <a href='" + presignedURL + "'>Download</a>"
 }

 const sent = await sgMail.send(msg)

 console.log("Email sent")

 console.log(sent)
 return sent
}

export { sendEmail }