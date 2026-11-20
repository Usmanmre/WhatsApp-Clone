import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const logger = new Logger('MongoDB');

        return {
          uri: configService.getOrThrow<string>('MONGODB_URI'),
          onConnectionCreate: (connection: Connection) => {
            connection.on('connected', () => {
              logger.log('Successfully connected to MongoDB');
            });
            connection.on('disconnected', () => {
              logger.warn('Disconnected from MongoDB');
            });
            connection.on('error', (error) => {
              logger.error(`MongoDB connection error: ${error}`);
            });

            return connection;
          },
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
