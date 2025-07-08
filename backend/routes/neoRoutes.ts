import express from "express";
import { getNeoFeed } from "../controllers";

const router = express.Router();

router.get("/feed", getNeoFeed);

export default router;
