import express from 'express';
const app = express();

app.post('/hooks/catch/:userId/:zapId', async (req, res) => {
    const { userId, zapId } = req.params;
});
