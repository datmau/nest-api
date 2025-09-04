import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit,
  SubscribeMessage, WebSocketGateway, WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomMessageDto } from './dto/room-message.dto';

@WebSocketGateway({ cors: true, namespace: '/chat' })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    console.log('ChatGateway initialized');
  }

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
    client.emit('connected', { id: client.id, notification: 'Bienvenido', type: 'info' });
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() text: string, @ConnectedSocket() client: Socket): string {
    this.server.emit('message', { sender: client.id, text });
    return 'Hello world!';
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(@MessageBody() room: string, @ConnectedSocket() client: Socket) {
    client.join(room);
    client.emit('joined', `${client.id} se unio a la sala ${room}`);
  }

  @SubscribeMessage('roomMessage')
  handleRoomMessage(@MessageBody() data: RoomMessageDto, @ConnectedSocket() client: Socket) {
    this.server.to(data.room).emit('message', { sender: client.id, text: data.message });
  }
}
