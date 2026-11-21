
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ConnectionRegistry {
  private connections = new Map<string, Set<string>>();

  add(userId: string, socketId: string) {
    Logger.log(`Adding connection for user ${userId} with socket ID ${socketId}`);
    const userSockets = this.connections.get(userId) ?? new Set<string>();
    Logger.log(`Current sockets for user ${userId}: ${[...userSockets].join(', ')}`);
    userSockets.add(socketId);

    this.connections.set(userId, userSockets);
    Logger.log(`Updated sockets for user ${userId}: ${[...userSockets].join(', ')}`);
  }

  get(userId: string): Set<string> | undefined {
    return this.connections.get(userId);
  }

  remove(userId: string, socketId: string) {
    const userSockets = this.connections.get(userId);

    if (!userSockets) return;

    userSockets.delete(socketId);

    if (userSockets.size === 0) {
      this.connections.delete(userId);
    }
  }

  getSockets(userId: string): string[] {
    return [...(this.connections.get(userId) ?? [])];
  }

  isOnline(userId: string): boolean {
    return this.connections.has(userId);
  }
}
