import express from "express"
import { getMessage, sendMessage } from "../controllers/message.controller.js";
import secureRoute from "../middlewares/secure-route.middlewares.js";
const router = express.Router();

router.post("/send/:id",secureRoute,sendMessage)
router.get("/get/:id",secureRoute,getMessage)

export {router};