import { Controller, Get, Post, Body } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { KafkaService } from '../kafka/kafka.service';

@Controller('messages')
export class MessagesController {
  constructor(
    private messagesService: MessagesService,
    private kafkaService: KafkaService,
  ) {}

  @Get()
  async getMessages() {
    return this.messagesService.getMessages();
  }

  @Post()
  async createMessage(@Body('text') text: string) {
    const message = await this.messagesService.createMessage(text);
    // Send message to Kafka including the timestamp
    this.kafkaService.sendMessage('message_topic', { text, createdAt: message.createdAt });
    return message;
  }
}
