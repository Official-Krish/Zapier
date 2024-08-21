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
    await prismaClient.availableAction.create({
        data: {
            id: "update-Gsheet",
            name: "Google Sheet",
            Image: "https://cdn.prod.website-files.com/655b60964be1a1b36c746790/655b60964be1a1b36c746d61_646e04919c3fa7c2380ae837_Google_Sheets_logo_(2014-2020).svg.png"
        }
    })
    
}

main();