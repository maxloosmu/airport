import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { KafkaModule } from '../kafka/kafka.module';

@Module({
  imports: [KafkaModule],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
