import { NeoObject } from "../models/nasa.models";
import axios from "axios";
import { Request, Response } from "express";

const getNeoFeed = async (req: Request, res: Response): Promise<any> => {
  const sevenDaysAgo = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000);

  const startDate =
    req.query["start_date"] || sevenDaysAgo.toISOString().split("T")[0];
  const endDate =
    req.query["end_date"] || new Date().toISOString().split("T")[0];

  try {
    const response = await axios.get(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${process.env["NASA_API_KEY"]}`
    );

    return res.json(response.data as NeoObject);
  } catch (error) {
    console.error("Mars Rover Photos Error:", (error as Error).message);
    res.status(500).json({ error: "Failed to fetch Mars Rover photos" });
  }
};

export { getNeoFeed };
