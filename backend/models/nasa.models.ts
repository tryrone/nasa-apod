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
