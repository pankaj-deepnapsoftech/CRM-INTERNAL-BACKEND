const { createTransport } = require("nodemailer");
require("dotenv").config();
const path = require("path");
const ejs = require("ejs");

const transporter = createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: "ashu546888@gmail.com",
    pass: "bhgh jciz ywfq yakk",
  },
  // Add timeout and connection options
  connectionTimeout: 10000, // 10 seconds
  greetingTimeout: 10000,
  socketTimeout: 10000,
  // Disable TLS certificate validation issues (if needed)
  tls: {
    rejectUnauthorized: false, // Some servers have certificate issues
  },
});

async function SendMail(templateName, templateData, reciverData) {
  try {
    const newPath = path.join(__dirname, "..", "template", templateName);

    const Emailtemplate = await ejs.renderFile(newPath, templateData);

    await transporter.sendMail({
      from: "ashu546888@gmail.com",
      to: reciverData.email,
      subject: reciverData.subject,
      text: "Itsybizz OTP",
      html: Emailtemplate,
    });

    console.log("send mail");
  } catch (error) {
    console.error("mail not send ", error);
    throw error; // Re-throw so calling code can handle it
  }
}

async function SendBulkMail(reciverData) {
  try {
    await transporter.sendMail({
      from: "ashu546888@gmail.com",
      to: reciverData.email,
      subject: reciverData.subject,
      html: `
        <html>
          <body>${reciverData.message}</body>
        </html>`
      ,
    });

    console.log("send mail");
  } catch (error) {
    console.error("mail not send ", error);
    throw error; // Re-throw so calling code can handle it
  }
}

module.exports = { SendMail,SendBulkMail };
