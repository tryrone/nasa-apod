import { MarsRoverResponse } from "../models/nasa.models";
import axios from "axios";
import { Request, Response } from "express";

const getMarsRoverPhotos = async (
  req: Request,
  res: Response
): Promise<any> => {
  const sol = req.query["sol"];
  const camera = req.query["camera"];

  if (!sol) {
    return res.status(400).json({ error: "Sol is required" });
  }

  if (!camera) {
    const response = await axios.get(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&api_key=${process.env["NASA_API_KEY"]}`
    );

    return res.json(response.data as MarsRoverResponse);
  }

  try {
    const response = await axios.get(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&camera=${camera}&api_key=${process.env["NASA_API_KEY"]}`
    );

    return res.json(response.data as MarsRoverResponse);
  } catch (error) {
    console.error("Mars Rover Photos Error:", (error as Error).message);
    res.status(500).json({ error: "Failed to fetch Mars Rover photos" });
  }
};

export { getMarsRoverPhotos };
