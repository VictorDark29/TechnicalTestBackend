import { Server } from 'socket.io';

export class WebSocketService {
  private static server: Server;

  public static initialize(server: Server) {
    WebSocketService.server = server;
  }

  public static emit(event: string, data: any) {
    if (WebSocketService.server) {
      WebSocketService.server.emit(event, data);
    }
  }
}
