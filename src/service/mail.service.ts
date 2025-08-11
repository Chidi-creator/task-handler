import { nodemailerConfig } from "@config/index";
import { EmailOptions } from "@config/types/email";
import { ProviderError } from "@managers/error.manager";
import { env } from "@config/env.config";

 class MailService {
  public async sendMail(mailOptions: EmailOptions): Promise<void> {
    try {
      const mailBody = {
        from: env.MAIL_USER,
        to: mailOptions.to,
        subject: mailOptions.subject,
        text: mailOptions.text,
        html: mailOptions.html,
      };
      await nodemailerConfig.sendMail(mailBody);
    } catch (error) {
      
      throw new ProviderError("Failed to send email");
    }
  }
}

export default MailService;
