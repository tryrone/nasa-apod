import express from "express";
import { getApod } from "../controllers/apodController";

const router = express.Router();

router.get("/", getApod);

export default router;
