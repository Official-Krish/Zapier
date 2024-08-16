import { Router } from "express"
import { authMiddleware } from "../Middleware";
import { SignupSchema, SigninSchema } from "../types";
import { prismaClient } from "../db";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "../config";
import { createActivationToken } from "../utils/activationtoken";
import sendMail from "../utils/sendEmail";

const router = Router()

router.post("/signup", async(req, res) => {
    const body = req.body;
    const parsedData = SignupSchema.safeParse(body);

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

    const user = {
        name: parsedData.data.name,
        email: parsedData.data.username,
        password: parsedData.data.password,
    };
    console.log(user.email);
    
    try {
        const activationToken = createActivationToken(user);

        const activationCode = activationToken.activationCode;

        const data = { user: { name: user.name }, activationCode };

        await sendMail({
            email: user.email,
            message: ` Hi <span>${user.name}</span> Your  activation Code is <p>${activationCode} </p> Please activate Your Account  `,
            subject: "Email Verification",
        });

        return res.status(201).json({
            success: true,
            message: `Please check your email: ${user.email} `,
            token: activationToken.token,
        });
        } catch (error: any) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: `Internal server error: ${error.message}`,
        });
    }
});

router.post("/verify-user", async (req, res) => {
    try {
        const token = req.body.token;
        const activationCode = req.body.activationCode;
    
        const decoded: JwtPayload = jwt.verify(token, JWT_SECRET) as JwtPayload;
        console.log("decoded", decoded);
    
        const user = decoded.user;
        console.log("user", user);
        console.log("activationCode", activationCode);
    
        const userExists = await prismaClient.user.findFirst({
            where: {
                email: user.email,
            },
        });
        if (userExists) {
            return res.status(403).json({
                message: "User already exists",
            });
        }
    
        const hashedPassword = (await bcrypt.hash(
            user.password,
            10
        )) as unknown as string;
    
        await prismaClient.user.create({
            data: {
                email: user.email,
                password: hashedPassword,
                name: user.name,
                isVerified: true,
            },
        });
        return res.status(200).json({ message: "registered successfully" });
    } catch (error) {
        res.status(400).json({ message: "You have entered the wrong code. Please try again." });
    }
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

router.post("/send-verification-email", async (req, res) => {
    const email = req.body.email;
    const user = await prismaClient.user.findFirst({
        where: {
            email
        }
    });

    if (!user) {
        return res.status(400).json({error: "User not found"});
    }
    try{
        const activationToken = createActivationToken(user);

        const activationCode = activationToken.activationCode;

        const data = { user: { name: user.name }, activationCode };

        await sendMail({
            email: user.email,
            message: ` Hi <span>${user.name}</span> Your  activation Code is <p>${activationCode} </p> Please activate Your Account  `,
            subject: "Email Verification",
        });

        return res.status(200).json({
            success: true,
            message: `Please check your email: ${user.email} `,
            token: activationToken.token,
        });
    } catch (error : any) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: `Internal server error: ${error.message}`,
        });
    }
});

router.post("/password-reset-verify", async (req, res) => {
    const activationCode = req.body.activationCode;
    try {
        const decoded: JwtPayload = jwt.verify(activationCode, JWT_SECRET) as JwtPayload;
        console.log("decoded", decoded);

        const user = decoded.user;
        console.log("user", user);

        return res.status(200).json({ message: "Verification successful"});
    } catch (error) {
        res.status(400).json({ message: "You have entered the wrong code. Please try again."});
    }
})

router.post("/password-reset", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const hashedPassword = (await bcrypt.hash(
        password,
        10
    )) as unknown as string;
    try{
        const user = await prismaClient.user.update({
            where: {
                email
            },
            data: {
                password: hashedPassword
            }
        });
        const token = jwt.sign({
            id: user.id,
        }, JWT_SECRET);

        res.status(200).json({ message: "Password reset successful", token });
    } catch (error) {
        res.status(400).json({ message: "Password reset failed"});
    }
})


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