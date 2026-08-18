const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Backend Ledger" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

const sendRegistrationEmail = async(userEmail, name) => {
  const subject = 'Welcome to Backend Ledger';
  const text = `Hello ${name}, welcome to Backend Ledger. We are glad to have you on board.`;
  const html = `
  <h1>Welcome to Backend Ledger</h1>
  <p>Hello ${name}, welcome to Backend Ledger. We are glad to have you on board.</p>
  <p>Thank you for registering with us. We hope you enjoy your time with us.</p>
  <p>Best regards,</p>
  <p>Backend Ledger Team</p>
  `;
  await sendEmail(userEmail, name, subject, text, html);
}

module.exports = {
  sendRegistrationEmail,
}