
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { ConnectionRegistry } from '../connection/connection.registry';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
  },
  pingInterval: 25000,
  pingTimeout: 20000,
})
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server: Server | undefined;

  constructor(
    private readonly connectionRegistry: ConnectionRegistry,
  ) {}

  handleConnection(client: Socket) {
    // Temporary identity for connection experiments.
    // We will replace this with verified JWT authentication.
    const userId = client.handshake.auth.userId;

    if (!userId) {
      client.disconnect(true);
      return;
    }

    client.data.userId = userId;

    this.connectionRegistry.add(userId, client.id);
  // Notify connected clients
    this.server?.emit('user:online', {
    userId,
  });
    Logger.log(`User ${userId} connected against socket ID ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    const userId = client.data.userId;
    if (!userId) return;
    this.connectionRegistry.remove(userId, client.id);
     // Notify connected clients
  this.server?.emit('user:offline', {
    userId,
  });
    Logger.log(`User ${userId} disconnected against socket ID ${client.id}`);
    this.connectionRegistry.get(userId)?.forEach(socketId => {
      Logger.log(`Remaining socket for user ${userId}: ${socketId}`);
    });
  }
}
