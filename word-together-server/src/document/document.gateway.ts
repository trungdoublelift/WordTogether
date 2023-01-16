/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { Body } from '@nestjs/common';
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Account } from 'src/models/user.model';
@WebSocketGateway({ cors: true })
export class DocumentGateWay implements OnGatewayConnection, OnGatewayDisconnect {
  rooms:Array<{roomId:string,users:Array<{userInfo:Account,socketId:string}>}>=[];
  @WebSocketServer() wss: Server;
  handleDisconnect(client: Socket) {
    console.log('disconnect ', client.id)
  }
  handleConnection(client: Socket) {
    console.log('connect ', client.id);
  }
  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket,payload:any) {

    client.join(payload.docId);
    let room = this.rooms.findIndex((room)=>room.roomId===payload.docId);
    if(room==-1){
      this.rooms.push({roomId:payload.docId,users:[{userInfo:payload.user,socketId:client.id}]});
    }else{
      this.rooms[room].users.push({userInfo:payload.user,socketId:client.id});
    }
    this.wss.emit('joinRoom',this.rooms[this.rooms.findIndex((room)=>room.roomId===payload.docId)]);
  }
  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket,payload:any) {
    client.leave(payload.docId);
    let room = this.rooms.findIndex((room)=>room.roomId===payload.docId);
    if(room!=-1){
      let user = this.rooms[room].users.findIndex((user)=>user.userInfo.userId===payload.user.userId);
      if(user!=-1){
        this.rooms[room].users.splice(user,1);
      }
    }
    this.wss.emit('leaveRoom',this.rooms[room]);
  }






}

