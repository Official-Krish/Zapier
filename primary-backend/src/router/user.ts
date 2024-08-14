import { Router } from "express"
import { authMiddleware } from "../Middleware";
import { SignupSchema, SigninSchema } from "../types";
import { prismaClient } from "../db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "../config";

const router = Router()

router.post("/signup", async(req, res) => {
    const body = req.body;
    const parsedData = SignupSchema.safeParse(body);
    const hashedPassword = await bcrypt.hash(body.password, 10);

    if(!parsedData.success) {
        return res.status(400).json({error: "Invalid data"});
    }

    const userExist = await prismaClient.user.findFirst({
        where: {
            email: parsedData.data.username
        }
    });

    if(userExist) {
        return res.status(400).json({error: "User already exist"});
    }

    await prismaClient.user.create({
        data: {
            email: parsedData.data.username,
            password: hashedPassword,
            name: parsedData.data.username
        }
    })

    //send email verification
    return res.json({message: "Please verify your email"});
});

router.post("/signin", async (req, res) => {
    const body = req.body;
    const parsedData = SigninSchema.safeParse(body);

    if(!parsedData.success) {
        return res.status(400).json({error: "Invalid data"});
    }

    try {
        const user = await prismaClient.user.findFirst({
            where: {
                email: parsedData.data.username
            }
        });

        if (!user) {
            return res.status(400).json({error: "user not found"});
        }

        const isPasswordMatch = await bcrypt.compare(parsedData.data.password, user.password);

        if (isPasswordMatch) {
            const token = jwt.sign({
                id: user.id,
            }, JWT_SECRET);
        
            res.json({token});
        } else {
            res.json({error: "Invalid password"});
        }
    } catch (err) {
        console.error('Error authenticating user:', err);
    }
});


router.get("/", authMiddleware, async (req, res) => {
    // TODO: Fix the type
    // @ts-ignore
    const id = req.id;
    const user = await prismaClient.user.findFirst({
        where: {
            id
        },
        select: {
            name: true,
            email: true
        }
    });

    return res.json({
        user
    });
})

export const userRouter = router;