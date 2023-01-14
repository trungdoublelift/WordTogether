/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import {MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
@WebSocketGateway({ cors: true })
export class DocumentGateWay {
  @WebSocketServer() server;
  @SubscribeMessage('document')
  handleMessage(@MessageBody() payload: any) {
    this.broadcast('add-document',payload);
  }
  @SubscribeMessage('test')
  handleTest(@MessageBody() payload: any) {
    this.broadcast('test','Nhan ne');
  };
  wsClients=[];
  handleConnection(client: any) {
    this.wsClients.push(client);
  }

  handleDisconnect(client) {
    for (let i = 0; i < this.wsClients.length; i++) {
      if (this.wsClients[i] === client) {
        this.wsClients.splice(i, 1);
        break;
      }
    }
    this.broadcast('disconnect',{});
  }
  private broadcast(event, message: any) {
    for (let c of this.wsClients) {
      c.send(event, message);

    }
  };


}
