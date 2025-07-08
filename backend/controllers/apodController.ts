import { APODResponse } from "../models/nasa.models";
import axios from "axios";
import { Request, Response } from "express";

const getApod = async (req: Request, res: Response): Promise<void> => {
  const date = req.query["date"] || new Date().toISOString().split("T")[0]; // Optional date param

  try {
    const response = await axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env["NASA_API_KEY"]}&date=${date}`
    );

    res.json(response.data as APODResponse);
  } catch (error) {
    console.error("APOD Error:", (error as Error).message);
    res.status(500).json({ error: "Failed to fetch APOD data" });
  }
};

export { getApod };
