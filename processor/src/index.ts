import { PrismaClient } from '@prisma/client'
import { Kafka } from "kafkajs";
const prisma = new PrismaClient()

const TOPIC_NAME = "zapier-events"
const kafka = new Kafka({
    clientId: "outbox-processor",
    brokers: ["localhost:9092"]
});
  

async function main() {
    const producer = kafka.producer()
    await producer.connect();
    while (1) {
        const pendingRows = await prisma.zapRunOutbox.findMany({
            where: {},
            take : 10,
        });
        console.log(pendingRows)

        producer.send({
            topic: TOPIC_NAME,
            messages: pendingRows.map(r => {
                return {
                    value : r.zapRunId
                }
            })
        });

        await prisma.zapRunOutbox.deleteMany({
            where: {
                id: {
                    in: pendingRows.map(r => r.id)
                }
            }
        })
    }
}
main()