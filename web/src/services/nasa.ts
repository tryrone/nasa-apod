import { api } from "./api";

// APOD (Astronomy Picture of the Day) Types
export interface APODResponse {
  date: string;
  explanation: string;
  hdurl?: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
  copyright?: string;
}

export interface MarsRoverCamera {
  id: number;
  name: string;
  rover_id: number;
  full_name: string;
}

export interface MarsRoverInfo {
  id: number;
  name: string;
  landing_date: string;
  launch_date: string;
  status: string;
}

export interface MarsRoverPhoto {
  id: number;
  sol: number;
  camera: MarsRoverCamera;
  img_src: string;
  earth_date: string;
  rover: MarsRoverInfo;
}

export interface MarsRoverResponse {
  photos: MarsRoverPhoto[];
}

export interface NeoResponse {
  near_earth_objects: Record<string, NeoObject[]>;
}

export interface NeoObject {
  links?: {
    self?: string;
  };
  id?: string;
  neo_reference_id?: string;
  name?: string;
  nasa_jpl_url?: string;
  absolute_magnitude_h: number;
  estimated_diameter?: {
    kilometers: EstimatedDiameter;
    meters: EstimatedDiameter;
    miles: EstimatedDiameter;
    feet: EstimatedDiameter;
  };
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data?: CloseApproachData[];
}

export interface EstimatedDiameter {
  estimated_diameter_min: number;
  estimated_diameter_max: number;
}

export interface CloseApproachData {
  close_approach_date: string;
  close_approach_date_full: string;
  epoch_date_close_approach: number;
  relative_velocity: {
    kilometers_per_second: string;
    kilometers_per_hour: string;
    miles_per_hour: string;
  };
  miss_distance: {
    astronomical: string;
    lunar: string;
    kilometers: string;
    miles: string;
  };
  orbiting_body: string;
}

export interface ImageSearchResponse {
  href: string;
  data: ImageSearchItem[];
  links: {
    href: string;
    rel: string;
    render: string;
    width: number;
    size: number;
    height: number;
  }[];
}

export interface ImageSearchData {
  center: string;
  date_created: string;
  description: string;
  description_508: string;
  keywords: string[];
  media_type: string;
  nasa_id: string;
  title: string;
}

export interface ImageSearchLink {
  href: string;
  rel: string;
  render: string;
  width: number;
  size: number;
  height: number;
}

export interface ImageSearchItem {
  data: ImageSearchData[];
  links: ImageSearchLink[];
}

// Available rovers
export const AVAILABLE_ROVERS = [
  "curiosity",
  "opportunity",
  "spirit",
  "perseverance",
] as const;
export type RoverName = (typeof AVAILABLE_ROVERS)[number];

// API endpoints
const endpoints = {
  apod: "/api/apod",
  marsPhotos: "/api/mars-photos",
  marsPhotosRover: (rover: string) => `/api/mars-photos/${rover}`,
  roverManifest: (rover: string) => `/api/rover-manifest/${rover}`,
  mostActiveRover: "/api/most-active-rover",
  latestRoverPhotos: "/api/latest-rover-photos",
  perseveranceWeather: "/api/perseverance-weather",
  marsWeather: "/api/mars-weather",
  multiPlanetaryDashboard: "/api/multi-planetary-dashboard",
};

// NASA API Service Functions
export const nasaApi = {
  // Get Astronomy Picture of the Day
  getAPOD: async (date?: string): Promise<APODResponse> => {
    const params = date ? { date } : undefined;
    return api.get<APODResponse>(endpoints.apod, params);
  },

  // Get Mars Rover photos (default rover)
  getMarsRoverPhotos: async (
    params: {
      rover?: string;
      sol?: number;
      camera?: string;
      page?: number;
    } = {}
  ): Promise<MarsRoverResponse> => {
    return api.get<MarsRoverResponse>(endpoints.marsPhotos, params);
  },

  // Get Mars Rover photos from specific rover
  getMarsRoverPhotosByRover: async (
    rover: RoverName,
    params: {
      sol?: number;
      camera?: string;
      page?: number;
    } = {}
  ): Promise<MarsRoverResponse> => {
    return api.get<MarsRoverResponse>(endpoints.marsPhotosRover(rover), params);
  },
};

// Helper function to format date for NASA API (YYYY-MM-DD)
export const formatDateForNASA = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Helper function to normalize date to midnight
export const normalizeDate = (date: Date): Date => {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
};

// Helper function to get rover display name
export const getRoverDisplayName = (rover: string): string => {
  const names: Record<string, string> = {
    curiosity: "Curiosity",
    opportunity: "Opportunity",
    spirit: "Spirit",
    perseverance: "Perseverance",
  };
  return names[rover.toLowerCase()] || rover;
};

// Constants
export const APOD_START_DATE = new Date("1995-06-16");
export const TODAY = normalizeDate(new Date());
