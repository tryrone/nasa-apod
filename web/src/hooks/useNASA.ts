/**
 * NASA API React Query Hooks
 * Custom hooks for fetching NASA data using React Query
 */

import { useQuery } from "@tanstack/react-query";
import { nasaApi } from "@/services/nasa";

// Query Keys
const QUERY_KEYS = {
  apod: "apod",
  marsRoverPhotos: "marsRoverPhotos",
  neoVisualizer: "neoVisualizer",
  mediaLibrary: "mediaLibrary",
} as const;

// APOD Hook
export const useAPOD = (date?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.apod, date],
    queryFn: () => nasaApi.getAPOD(date),
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60 * 24,
  });
};

// Mars Rover Photos Hook
export const useMarsRoverPhotos = (
  params: {
    rover?: string;
    sol?: number;
    camera?: string;
    page?: number;
  } = {},
  options?: {
    enabled?: boolean;
  }
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.marsRoverPhotos, params],
    queryFn: () => nasaApi.getMarsRoverPhotos(params),
    staleTime: 1000 * 60 * 15,
    gcTime: 1000 * 60 * 60 * 2,
    ...options,
  });
};

export const useNearEarthObjects = (
  params: {
    start_date?: string;
    end_date?: string;
  } = {},
  options?: {
    enabled?: boolean;
  }
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.neoVisualizer, params],
    queryFn: () => nasaApi.getNearEarthObjects(params),
    staleTime: 1000 * 60 * 15,
    gcTime: 1000 * 60 * 60 * 2,
    ...options,
  });
};

export const useMediaLibrary = (params: { query: string; page: number }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.mediaLibrary, params],
    queryFn: () => nasaApi.getMediaLibrary(params),
  });
};

// Export available rovers for components
export const AVAILABLE_ROVERS = [
  "curiosity",
  "opportunity",
  "spirit",
  "perseverance",
] as const;
