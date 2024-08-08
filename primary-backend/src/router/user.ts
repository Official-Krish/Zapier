import { Router } from "express"
import { authMiddleware } from "../Middleware";

const router = Router()

router.post("/signup", (req, res) => {

});

router.post("signin", (req, res) => {

});

router.get("/user", authMiddleware, (req, res) => {
    console.log("hello");
});

export const userRouter = router;