import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ConnectionRegistryModule } from '../connection/connection.module';

@Module({
  imports: [ConnectionRegistryModule],
  providers: [ChatGateway],
})
export class ChatModule {}