"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const kafkajs_1 = require("kafkajs");
const prisma = new client_1.PrismaClient();
const TOPIC_NAME = "zapier-events";
const kafka = new kafkajs_1.Kafka({
    clientId: "outbox-processor",
    brokers: ["localhost:9092"]
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const consumer = kafka.consumer({ groupId: "outbox-processor" });
        yield consumer.connect();
        yield consumer.subscribe({
            topic: "zapier-events", fromBeginning: true
        });
        yield consumer.run({
            eachMessage: ({ topic, partition, message }) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                console.log({
                    offset: message.offset,
                    value: (_a = message === null || message === void 0 ? void 0 : message.value) === null || _a === void 0 ? void 0 : _a.toString(),
                });
                yield new Promise(resolve => setTimeout(resolve, 2000));
            }),
        });
    });
}
main();
