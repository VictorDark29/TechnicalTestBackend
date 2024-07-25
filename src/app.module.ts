import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { IotModule } from './socket/iot.module';
import { RabbitMQModule } from './socket/rabbitmq.module';
import { MailModule } from './socket/mail.module';
import { RabbitMQController } from './socket/rabbitmq.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    IotModule,
    RabbitMQModule,
    MailModule,
  ],
  controllers: [RabbitMQController],
  providers: [],
})
export class AppModule {}
