export function verifyEmailTemplate(
  userName: string,
  otp: string,
  desc: string,
) {
  return `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #0066cc; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 30px; border-radius: 5px; margin-top: 20px; }
            .otp-code { font-size: 32px; font-weight: bold; color: #0066cc; text-align: center; letter-spacing: 5px; padding: 20px; background-color: white; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
            .warning { color: #d9534f; font-weight: bold; margin-top: 15px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>SAOVIET Team</h1>
            </div>
            <div class="content">
              <h2>Xin chào ${userName}!</h2>
              <p>${desc}:</p>
              
              <div class="otp-code">${otp}</div>
              
              <p><strong>Mã xác thực này sẽ hết hạn sau 5 phút.</strong></p>
              
              <p class="warning">⚠️ Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này và liên hệ quản trị viên ngay lập tức.</p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} SAOVIET Vietnam</p>
              <p>Email này được gửi tự động, vui lòng không trả lời.</p>
            </div>
          </div>
        </body>
        </html>
      `;
}

export function verifyEmailText(userName: string, otp: string, desc: string) {
  return `
          Xin chào ${userName}!
          
          ${desc}
          
          Mã xác thực của bạn là: ${otp}
          
          Mã này sẽ hết hạn sau 5 phút.
          
          Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này.
          
          © ${new Date().getFullYear()} SAOVIET
        `;
}
