import { env } from "./env.config";
import { EmailOptions, NodeMailerConfigType } from "./types/email";
import { nodeMailerConfig } from "@global/constants";
import * as nodemailer from "nodemailer";
import { ProviderError } from "@managers/error.manager";

class NodemailerConfig {
  private static instance: NodemailerConfig;
  private transporter: nodemailer.Transporter;
  private config: NodeMailerConfigType;
  constructor() {
    this.config = nodeMailerConfig;
    this.transporter = nodemailer.createTransport(this.config);
  }

  public static getInstance = () => {
    if (!NodemailerConfig.instance) {
      NodemailerConfig.instance = new NodemailerConfig();
    }
    return NodemailerConfig.instance;
  };

  async sendMail(mailOptions: EmailOptions): Promise<void> {
    try {
      const mailBody = {
        from: env.MAIL_USER,
        to: mailOptions.to,
        subject: mailOptions.subject,
        text: mailOptions.text,
        html: mailOptions.html,
      };
     await this.transporter.sendMail(mailBody);
    } catch (error) {
      console.log(error)
      throw new ProviderError("Failed to send email");
    }
  }
}

export default NodemailerConfig;
