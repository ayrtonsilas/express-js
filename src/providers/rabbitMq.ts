import { Connection, Channel, connect, Message } from 'amqplib';
import * as dotenv from 'dotenv';
dotenv.config();

export default class RabbitMq {
  private conection: Connection;
  private channel: Channel;
  static instance: RabbitMq;

  constructor(private uri: string) {}

  static getSingleton() {
    if (RabbitMq.instance) {
      return RabbitMq.instance;
    }
    RabbitMq.instance = new RabbitMq(
      `amqp://${process.env.RABBIT_USER}:${process.env.RABBIT_PASSWORD}@${process.env.RABBIT_HOST}:${process.env.RABBIT_PORT}`,
    );
    
    return RabbitMq.instance;
  }

  async start(): Promise<RabbitMq> {
    this.conection = await connect(this.uri);
    this.channel = await this.conection.createChannel();
    await this.channel.assertQueue('products');
    await this.channel.bindQueue('products','stock','incremented');
    await this.channel.bindQueue('products','stock','decremented');
    return this;
  }

  async publishInQueue(queue: string, message: string) {
    return this.channel.sendToQueue(queue, Buffer.from(message));
  }

  async publishInExchange(
    exchange: string,
    routingKey: string,
    message: string,
  ): Promise<boolean> {
    return this.channel.publish(exchange, routingKey, Buffer.from(message));
  }

  async consume(
    queue: string,
    callback: (message: Message) => Promise<boolean>,
  ) {
    await this.channel.consume(queue, async (message) => {
      const processed = await callback(message);

      if (processed) {
        console.log(`message: ${message.content.toString()} processed`);
        this.channel.ack(message);
      } else {
        console.log(`message: ${message.content.toString()} not processed`);
      }
    });
  }
}
