
import { PrismaClient } from "@prisma/client";
const prismaClient = new PrismaClient();

async function main() {
    await prismaClient.availableTriggers.create({
        data: {
            id: "webhook",
            name: "Webhook",
            Image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIovxkR9l-OlwpjTXV1B4YNh0W_s618ijxAQ&s",
            
        }
    })    

    await prismaClient.availableAction.create({
        data: {
            id: "send-sol",
            name: "Send Solana",
            Image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT10458YI0Lf1-Zx4fGwhWxI_x4oPCD034xaw&s"
        }
    })

    await prismaClient.availableAction.create({
        data: {
            id: "email",
            name: "Send Email",
            Image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4nd82eFk5SaBPRIeCpmwL7A4YSokA-kXSmw&s"
        }
    })
    
}

main();