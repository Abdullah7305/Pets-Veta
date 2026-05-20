const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD, // app password
  },
});

const otpGenerator = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);

  return otp.toString();
}

const sendOtp = async (email, otpCode) => {
  try {
    const info = await transporter.sendMail({
      from: 'abdullahsuleman755@gmail.com',
      to: email,
      subject: "OTP Code",
      text: "Your OTP Code", // fallback
      html: `
  <body style="margin: 0; padding: 0; background-color: #eaf1ed; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">

    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #eaf1ed; padding: 40px 20px;">
      <tr>
        <td align="center">

          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #fdfbf7; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.08);">

            <!-- Header -->
            <tr>
              <td style="padding: 40px 40px 20px 40px;">
                <table width="100%">
                  <tr>
                    <td width="50%">
                      <img src="YOUR_LOGO_URL_HERE.png" style="width: 140px;" />
                      <p style="color: #553e2a; font-size: 13px;">Compassion. Care. Trust.</p>
                    </td>
                    <td width="50%" style="text-align: right;">
                      <img src="YOUR_HEADER_IMAGE_URL_HERE.png" style="width: 200px;" />
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Title -->
            <tr>
              <td align="center" style="padding: 20px;">
                <h1 style="color: #4a3320;">Your OTP Code</h1>
                <p style="color: #4a3320;">
                  Use the code below to verify your account
                </p>
              </td>
            </tr>

            <!-- OTP -->
            <tr>
              <td align="center" style="padding: 30px;">
                <div style="background:#faeadd; padding:20px; font-size:40px; font-weight:bold; letter-spacing:10px; color:#5a3f28; border-radius:12px;">
                  ${otpCode}
                </div>
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
  `,
    });

    console.log("Message sent: %s", info.messageId);


    return info;

  } catch (err) {
    console.error("Error while sending mail:", err);
    // Optional: Rethrow the error so your main calling function knows it failed
    throw err;
  }
}
module.exports = {
  otpGenerator,
  sendOtp
}