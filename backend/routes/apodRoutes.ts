import express from "express";
import { getApod } from "../controllers";

const router = express.Router();

router.get("/", getApod);

export default router;
