import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendEmail = async (presignedURL, fileNames, zoomAcount) => {

  const text = `Your Zoom Download for the account ${zoomAcount} is ready with the files - ${fileNames.join("\n")} \n Click the link below to download it <br><a> ${presignedURL} </a></br>. The link is only valid for 7 days.`

  const html = `Your Zoom Download for the account <b>${zoomAcount}</b> is ready with the files - <br><br>${fileNames.join("<br>")}<br><br>Click the link below to download it-<br><a href='${presignedURL}'>Download</a> <br><br>The link is only valid for 7 days.`

  const msg = {
    from: "zoom@kshitizagrawal.in",
    to: ["sanjeev@dreamsoft4u.com","kshitizagrawal@outlook.com"],
    subject: "Your Zoom Download is Ready",
    text,
    html
  }

 const sent = await sgMail.send(msg, true)

 console.log("Email sent")

 console.log(sent)
 return sent
}

export { sendEmail }
