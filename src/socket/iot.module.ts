import { Module } from '@nestjs/common';
import { IotGateway } from './iot.gateway';
import { RabbitMQModule } from './rabbitmq.module';

@Module({
  imports: [RabbitMQModule],
  providers: [IotGateway],
})
export class IotModule {}
