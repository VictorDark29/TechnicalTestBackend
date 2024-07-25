import { WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { WebSocketService } from './websocket.service';
import { RabbitMQService } from './rabbitmq.service'; // Asegúrate de ajustar la ruta según tu estructura de carpetas

@WebSocketGateway({
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  }
})
export class IotGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('IotGateway');

  constructor(private readonly rabbitMQService: RabbitMQService) {}

  afterInit(server: Server) {
    this.logger.log('Init');
    WebSocketService.initialize(server);
    this.sendRandomDataPeriodically();
  }

  handleConnection(client: any, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
    WebSocketService.emit('log-data', `Client connected: ${client.id}`);
  }

  handleDisconnect(client: any) {
    this.logger.log(`Client disconnected: ${client.id}`);
    WebSocketService.emit('log-data', `Client disconnected: ${client.id}`);
  }

  async sendRandomData() {
    const data = {
      temperature: parseFloat((Math.random() * 30 + 15 ).toFixed(2)),
      humidity: parseFloat((Math.random() * 100).toFixed(2)),
    };

    this.logger.log('Sended: ' + JSON.stringify(data));
    WebSocketService.emit('log-data', 'Sended: ' + JSON.stringify(data));
    WebSocketService.emit('iot-data', data);

    if (data.temperature > 28) {
      await this.rabbitMQService.sendMessage(data);
    }
  }

  sendRandomDataPeriodically() {
    setInterval(() => {
      this.sendRandomData();
    }, 5000);
  }
}
