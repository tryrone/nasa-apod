import axios from "axios";
import { Request, Response } from "express";

const getApod = async (req: Request, res: Response) => {
  const date = req.query["date"] || ""; // Optional date param
  try {
    const response = await axios.get(`https://api.nasa.gov/planetary/apod`, {
      params: {
        api_key: process.env["NASA_API_KEY"],
        date: date,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("APOD Error:", (error as Error).message);
    res.status(500).json({ error: "Failed to fetch APOD data" });
  }
};

export { getApod };
