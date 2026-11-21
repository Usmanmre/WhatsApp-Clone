import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { RealtimeModule } from '../realtime/realtime.module';

@Module({
  imports: [RealtimeModule],
  providers: [ChatGateway],
})
export class ChatModule {}