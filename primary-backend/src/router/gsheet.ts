import { Router } from "express";

const router = Router();

router.post('/receive-link', (req, res) => {
    const { sheetLink, sheetId, sheetName } = req.body;
    
    // Handle the received data
    console.log('Received Google Sheet Link:', sheetLink);
    console.log('Sheet ID:', sheetId);
    console.log('Sheet Name:', sheetName);

    // You can save this information in your database, log it, or use it as needed

    res.status(200).send('Link received successfully');
});

export const gsheetRouter = router;