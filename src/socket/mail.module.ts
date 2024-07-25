import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'live.smtp.mailtrap.io',
        port: 587,
        secure: false,
        auth: {
          user: 'api',
          pass: 'be9809d76638b69546508ae0b9be184d', 
        },
      },
      defaults: {
        from: '"No Reply" <mailtrap@demomailtrap.com>',
      },
      template: {
        dir: join('src/socket', 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  exports: [MailerModule],
})
export class MailModule {}
