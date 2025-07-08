import { ImageSearchResponse } from "../models/nasa.models";
import axios from "axios";
import { Request, Response } from "express";

const searchImages = async (req: Request, res: Response): Promise<any> => {
  const query = req.query["query"];

  if (!query) {
    return res.status(400).json({ error: "Missing query parameter" });
  }

  try {
    const response = await axios.get(
      `https://images-api.nasa.gov/search?q=${query}&media_type=image`
    );

    return res.json(response.data as ImageSearchResponse);
  } catch (error) {
    console.error("Image Search Error:", (error as Error).message);
    res.status(500).json({ error: "Failed to fetch images" });
  }
};

export { searchImages };
