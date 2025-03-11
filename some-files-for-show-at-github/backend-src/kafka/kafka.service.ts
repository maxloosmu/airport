import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, Producer, Consumer } from 'kafkajs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KafkaService implements OnModuleInit {
  private kafka: Kafka;
  private producer: Producer;
  private consumer: Consumer;

  constructor(private configService: ConfigService) {
    const broker = this.configService.get<string>('KAFKA_BROKER');
    if (!broker) {
      throw new Error('KAFKA_BROKER is not defined in the environment variables');
    }

    this.kafka = new Kafka({
      clientId: 'nestjs-kafka',
      brokers: [broker],
    });

    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: 'nestjs-group' });
  }

  async onModuleInit() {
    await this.producer.connect();
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: 'message_topic', fromBeginning: true });

    this.consumer.run({
      eachMessage: async ({ message }) => {
        console.log(`Received message from Kafka: ${message.value?.toString()}`);
      },
    });
  }

  async sendMessage(topic: string, message: any) {
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
  }
}
