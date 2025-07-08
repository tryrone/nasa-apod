// APOD (Astronomy Picture of the Day) Response
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
