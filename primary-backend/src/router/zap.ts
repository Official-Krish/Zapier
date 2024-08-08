import { Router } from "express"
import { authMiddleware } from "../Middleware";

const router = Router()

router.post("/", authMiddleware, (req, res) => {
    console.log("create zap");
});


router.get("/", authMiddleware, (req, res) => {

});

router.get("/:zapId", authMiddleware, (req, res) => {

});

export const zapRouter = router;