import express from 'express';
import { PrismaClient } from '@prisma/client';
const app = express();
const client = new PrismaClient();

app.use(express.json());

app.post('/hooks/catch/:userId/:zapId', async (req, res) => {
    const { userId, zapId } = req.params;
    const body = req.body;

    await client.$transaction(async (tx) => {
        const run = await client.zapRun.create({
            data: {
                zapId : zapId,
                metadata : body,
            }
        });

        await client.zapRunOutbox.create({
            data: {
                zapRunId : run.id,
            }
        });
        res.json({
            msg : 'success'
        })
    });
});
app.listen(3000);