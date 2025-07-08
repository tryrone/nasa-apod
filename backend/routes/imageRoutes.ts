import express from "express";
import { searchImages } from "../controllers";

const router = express.Router();

router.get("/search", searchImages);

export default router;
