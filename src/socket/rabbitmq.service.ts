import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RabbitMQService {
  constructor(
    @Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy,
  ) {}

  async sendMessage(data: any) {
    return this.client.send('main_queue', data).toPromise();
  }
}
