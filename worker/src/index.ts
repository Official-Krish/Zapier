import { PrismaClient } from '@prisma/client'
import { JsonObject } from '@prisma/client/runtime/library';
import { Kafka } from "kafkajs";
import { parse } from './parser';
const prisma = new PrismaClient()

const TOPIC_NAME = "zapier-events"
const kafka = new Kafka({
    clientId: "outbox-processor",
    brokers: ["localhost:9092"]
});
  

async function main() {
  const consumer = kafka.consumer({ groupId: "outbox-processor" });
  await consumer.connect();
  const producer = kafka.producer()
  await producer.connect();

  await consumer.subscribe({
      topic: "zapier-events", fromBeginning: true
  })
  await consumer.run({
    autoCommit: false,
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message?.value?.toString(),
      });

      if(!message.value?.toString()) {
        return;
      }
      const parsedvalue = JSON.parse(message.value?.toString())
      const zapRunId = parsedvalue.zapRunId;
      const stage = parsedvalue.stage;

      const zapRunDetails = await prisma.zapRun.findFirst({
        where: {
          id: zapRunId
        },
        include: {
          zap: {
            include: {
              actions: {
                include:{
                  type: true
                }
              }
            }
          }
        }
      });

      const currentAction = zapRunDetails?.zap.actions.find(a => a.sortingOrder === stage);

      if(!currentAction) {
        console.log("No action found for stage");
        return;
      }

      console.log("Processing action", currentAction);

      const zapRunMetaData = zapRunDetails?.metadata;

      if (currentAction.type.id === "email"){
        const body = parse((currentAction.metadata as JsonObject)?.body as string, zapRunMetaData);
        const to = parse((currentAction.metadata as JsonObject)?.email as string, zapRunMetaData); 
        console.log(`Sending email to ${to} with body ${body}`); 
      }

      if (currentAction.type.id === "send-sol"){
        const amount = parse((currentAction.metadata as JsonObject)?.amount as string, zapRunMetaData);
        const address = parse((currentAction.metadata as JsonObject)?.address as string, zapRunMetaData); 
        console.log(`Sending sol to ${address} of amount ${amount}`); 
      }

      await new Promise(resolve => setTimeout(resolve, 1000))

      const zapId = message.value?.toString();
      const lastStage = (zapRunDetails?.zap.actions?.length || 1) - 1;

      if(lastStage !== stage) {
        producer.send({
          topic: TOPIC_NAME,
          messages: [
            {
              value : JSON.stringify({
                zapRunId: zapRunId,
                stage : stage + 1
              })
            }
          ]
        });
      }

      console.log("processing done");

      await consumer.commitOffsets([{
        topic : TOPIC_NAME,
        partition : partition,
        offset : (parseInt(message.offset) + 1).toString()
      }])
    },
  })
}
main();