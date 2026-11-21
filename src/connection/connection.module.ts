import { Module } from '@nestjs/common';
import { ConnectionRegistry } from './connection.registry';

@Module({
  providers: [ConnectionRegistry],
  exports: [ConnectionRegistry],
})
export class ConnectionRegistryModule {}