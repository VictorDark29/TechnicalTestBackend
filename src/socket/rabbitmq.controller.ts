import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
@Controller()
export class RabbitMQController {
  constructor(private readonly mailerService: MailerService, private configService :ConfigService) {}
  private logger: Logger = new Logger('RabbitMQController');

  @MessagePattern('main_queue')
  async handleMessage(@Payload() data: any) {
    console.log('Received message:', data);
    await this.sendEmail(data);
  }

  async sendEmail(data: any) {
    if(this.configService.get<string>('SEND')==="true"){
      this.logger.log("Sending email to -->  "+this.configService.get<string>('MAIL'));
      await this.mailerService.sendMail({
        to: this.configService.get<string>('MAIL'),
        subject: 'Temperature Alert',
        template: './mail', 
        context: { 
          temperature: data.temperature,
        },
    });
    }else{
      this.logger.log("Email sending feature is not enabled, you can enable it in the .env configuration file, just change the SEND property to 'true'")
    }
    
  }
}
