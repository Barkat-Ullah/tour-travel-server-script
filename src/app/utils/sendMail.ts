import nodemailer from 'nodemailer';

export const generateOtpEmail = (otp: string) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>OTP Verification</title>
</head>
<body style="margin:0;padding:0;background-color:#f0f4f8;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;-webkit-font-smoothing:antialiased;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f0f4f8;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 40px rgba(0,0,0,0.10);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0f172a 0%,#1e293b 100%);padding:36px 40px 32px;text-align:center;position:relative;">
              <!-- Logo row -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="background-color:#3b82f6;border-radius:10px;width:40px;height:40px;text-align:center;vertical-align:middle;padding:0 9px;">
                          <span style="font-size:20px;line-height:40px;">🚗</span>
                        </td>
                        <td style="padding-left:10px;vertical-align:middle;">
                          <span style="font-size:20px;font-weight:700;color:#ffffff;letter-spacing:-0.3px;">Auto Dealer</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <!-- Accent line -->
              <div style="position:absolute;bottom:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#3b82f6,#06b6d4,#3b82f6);"></div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:44px 40px 36px;">

              <!-- Tag -->
              <p style="margin:0 0 8px 0;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1.4px;">Security Verification</p>

              <!-- Title -->
              <h1 style="margin:0 0 14px 0;font-size:24px;font-weight:700;color:#0f172a;line-height:1.3;">One-Time Password</h1>

              <!-- Description -->
              <p style="margin:0 0 32px 0;font-size:15px;color:#475569;line-height:1.7;">
                Use the code below to verify your identity. This code is valid for a single use only and should not be shared with anyone.
              </p>

              <!-- OTP Box -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
                <tr>
                  <td style="background:#f8fafc;border:2px dashed #cbd5e1;border-radius:12px;padding:28px 20px;text-align:center;">
                    <p style="margin:0 0 10px 0;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1.5px;">Your OTP Code</p>
                    <p style="margin:0;font-size:44px;font-weight:800;color:#0f172a;letter-spacing:14px;text-indent:14px;font-family:'Courier New',Courier,monospace;">${otp}</p>
                    <div style="width:40px;height:3px;background:#3b82f6;border-radius:2px;margin:14px auto 0;"></div>
                  </td>
                </tr>
              </table>

              <!-- Expiry Warning -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
                <tr>
                  <td style="background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:12px 16px;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="font-size:16px;padding-right:10px;vertical-align:top;">⏱</td>
                        <td style="font-size:13px;color:#92400e;line-height:1.6;">
                          This code expires in <strong>10 minutes</strong>. If you didn't request it, you can safely ignore this email.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <div style="height:1px;background:#e2e8f0;margin-bottom:24px;"></div>

              <!-- Security note -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="border-left:3px solid #3b82f6;padding:12px 16px;background:#f8fafc;border-radius:0 8px 8px 0;">
                    <p style="margin:0;font-size:13px;color:#64748b;line-height:1.6;">
                      🔒 <strong>Auto Dealer</strong> will never ask for your OTP via call or chat. Keep it confidential.
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:24px 40px;text-align:center;">
              <p style="margin:0 0 6px 0;font-size:12px;color:#94a3b8;line-height:1.7;">
                This is an automated message. Please do not reply to this email.
              </p>
              <p style="margin:0;font-size:12px;color:#94a3b8;">
                © ${new Date().getFullYear()} Auto Dealer. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;
};

export const inviteUserEmail = (
  fullName: string,
  email: string,
  password: string,
) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to Auto Dealer</title>
</head>
<body style="margin:0;padding:0;background-color:#f0f4f8;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;-webkit-font-smoothing:antialiased;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f0f4f8;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 40px rgba(0,0,0,0.10);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#064e3b 0%,#065f46 100%);padding:40px 40px 36px;text-align:center;position:relative;">
              <!-- Logo -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="background-color:#10b981;border-radius:10px;width:40px;height:40px;text-align:center;vertical-align:middle;padding:0 9px;">
                          <span style="font-size:20px;line-height:40px;">🚗</span>
                        </td>
                        <td style="padding-left:10px;vertical-align:middle;">
                          <span style="font-size:20px;font-weight:700;color:#ffffff;letter-spacing:-0.3px;">Auto Dealer</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <!-- Welcome badge -->
              <div style="margin-top:20px;">
                <span style="display:inline-block;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);border-radius:24px;padding:6px 20px;font-size:13px;color:#a7f3d0;font-weight:500;letter-spacing:0.5px;">
                  🎉 Welcome to the Team
                </span>
              </div>
              <!-- Accent line -->
              <div style="position:absolute;bottom:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#10b981,#34d399,#10b981);"></div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:44px 40px 36px;">

              <!-- Tag -->
              <p style="margin:0 0 8px 0;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1.4px;">Account Created</p>

              <!-- Title -->
              <h1 style="margin:0 0 14px 0;font-size:24px;font-weight:700;color:#0f172a;line-height:1.3;">Your Driver Account<br/>is Ready, ${fullName}!</h1>

              <!-- Description -->
              <p style="margin:0 0 30px 0;font-size:15px;color:#475569;line-height:1.7;">
                You have been successfully registered as a driver on <strong>Auto Dealer</strong>. Below are your login credentials. Please keep them safe and update your password after your first login.
              </p>

              <!-- Credentials Card -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1.5px solid #e2e8f0;border-radius:12px;overflow:hidden;margin-bottom:24px;">
                <!-- Card Header -->
                <tr>
                  <td style="background:#064e3b;padding:13px 20px;">
                    <span style="font-size:12px;font-weight:700;color:#a7f3d0;text-transform:uppercase;letter-spacing:1px;">🔐 Your Login Credentials</span>
                  </td>
                </tr>
                <!-- Email Row -->
                <tr>
                  <td style="padding:16px 20px;border-bottom:1px solid #e2e8f0;background:#f8fafc;">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td style="width:38px;height:38px;background:#dbeafe;border-radius:8px;text-align:center;vertical-align:middle;font-size:17px;padding:0 8px;">📧</td>
                        <td style="padding-left:14px;vertical-align:middle;">
                          <p style="margin:0 0 3px 0;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.8px;">Email Address</p>
                          <p style="margin:0;font-size:14px;font-weight:700;color:#0f172a;font-family:'Courier New',Courier,monospace;">${email}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <!-- Password Row -->
                <tr>
                  <td style="padding:16px 20px;background:#f8fafc;">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td style="width:38px;height:38px;background:#dcfce7;border-radius:8px;text-align:center;vertical-align:middle;font-size:17px;padding:0 8px;">🔑</td>
                        <td style="padding-left:14px;vertical-align:middle;">
                          <p style="margin:0 0 3px 0;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.8px;">Temporary Password</p>
                          <p style="margin:0;font-size:14px;font-weight:700;color:#0f172a;font-family:'Courier New',Courier,monospace;">${password}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Warning Box -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
                <tr>
                  <td style="background:#fff7ed;border:1px solid #fed7aa;border-radius:10px;padding:15px 18px;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="font-size:20px;padding-right:12px;vertical-align:top;">⚠️</td>
                        <td>
                          <p style="margin:0 0 4px 0;font-size:13px;font-weight:700;color:#9a3412;">Change Your Password Immediately</p>
                          <p style="margin:0;font-size:13px;color:#c2410c;line-height:1.6;">
                            This is a system-generated temporary password. For your security, please update it after your first login and do not share these credentials with anyone.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Steps -->
              <p style="margin:0 0 16px 0;font-size:12px;font-weight:700;color:#0f172a;text-transform:uppercase;letter-spacing:0.8px;">Getting Started</p>

              <!-- Step 1 -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:12px;">
                <tr>
                  <td style="width:28px;height:28px;background:#064e3b;border-radius:50%;text-align:center;vertical-align:middle;font-size:12px;font-weight:700;color:#ffffff;padding:0;">1</td>
                  <td style="padding-left:12px;font-size:14px;color:#475569;line-height:1.6;vertical-align:middle;">Log in using the credentials provided above.</td>
                </tr>
              </table>
              <!-- Step 2 -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:12px;">
                <tr>
                  <td style="width:28px;height:28px;background:#064e3b;border-radius:50%;text-align:center;vertical-align:middle;font-size:12px;font-weight:700;color:#ffffff;padding:0;">2</td>
                  <td style="padding-left:12px;font-size:14px;color:#475569;line-height:1.6;vertical-align:middle;">Go to <strong>Profile Settings</strong> and update your password immediately.</td>
                </tr>
              </table>
              <!-- Step 3 -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
                <tr>
                  <td style="width:28px;height:28px;background:#064e3b;border-radius:50%;text-align:center;vertical-align:middle;font-size:12px;font-weight:700;color:#ffffff;padding:0;">3</td>
                  <td style="padding-left:12px;font-size:14px;color:#475569;line-height:1.6;vertical-align:middle;">Start accepting <strong>delivery orders</strong> assigned to you.</td>
                </tr>
              </table>

              <!-- Divider -->
              <div style="height:1px;background:#e2e8f0;margin-bottom:24px;"></div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:24px 40px;text-align:center;">
              <p style="margin:0 0 4px 0;font-size:13px;color:#475569;font-weight:600;">Auto Dealer Team</p>
              <p style="margin:0 0 8px 0;font-size:12px;color:#94a3b8;line-height:1.7;">
                This account was created by an admin. If this was a mistake, contact support immediately.
              </p>
              <p style="margin:0;font-size:12px;color:#94a3b8;">
                © ${new Date().getFullYear()} Auto Dealer. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;
};

const emailSender = async (to: string, html: string, subject: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.OWN_MAIL!,
        pass: process.env.OWN_MAIL_PASS!,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: '"Project" <barkatullah585464@gmail.com>',
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    return info.messageId;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error('Failed to send email. Please try again later.');
  }
};

// const emailSender = async (to: string, html: string, subject: string) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: 'smtp-relay.brevo.com',
//       port: 2525,
//       secure: false,
//       auth: {
//         user: process.env.BREVO_MAIL!,
//         pass: process.env.BREVO_MAIL_PASS!,
//       },
//     });
//     const mailOptions = {
//       from: '<akonhasan680@gmail.com>',
//       to,
//       subject,
//       text: html.replace(/<[^>]+>/g, ''),
//       html,
//     };
//     // Send the email
//     const info = await transporter.sendMail(mailOptions);
//     return info.messageId;
//   } catch (error) {
//     throw new Error('Failed to send email. Please try again later.');
//   }
// };

export default emailSender;
