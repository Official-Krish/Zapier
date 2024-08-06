import { PrismaClient } from '@prisma/client'
import { Kafka } from "kafkajs";
const prisma = new PrismaClient()

const TOPIC_NAME = "zapier-events"
const kafka = new Kafka({
    clientId: "outbox-processor",
    brokers: ["localhost:9092"]
});
  

async function main() {
    const consumer = kafka.consumer({ groupId: "outbox-processor" });
    await consumer.connect();
    await consumer.subscribe({
        topic: "zapier-events", fromBeginning: true
    })
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          console.log({
            partition,
            offset: message.offset,
            value: message?.value?.toString(),
          })
          await new Promise(resolve => setTimeout(resolve, 2000))
        },
    })
}
main();