import type { NeoResponse } from "@/services/nasa";

export function getHazardousCount(
  feedData: NeoResponse
): { name: string; value: number }[] {
  if (!feedData?.near_earth_objects) {
    return [
      { name: "Hazardous", value: 0 },
      { name: "Non-Hazardous", value: 0 },
    ];
  }

  let hazardous = 0;
  let nonHazardous = 0;

  // Single iteration through all NEOs
  for (const neoList of Object.values(feedData.near_earth_objects)) {
    if (!Array.isArray(neoList)) continue;

    for (const neo of neoList) {
      if (neo?.is_potentially_hazardous_asteroid) {
        hazardous++;
      } else {
        nonHazardous++;
      }
    }
  }

  return [
    { name: "Hazardous", value: hazardous },
    { name: "Non-Hazardous", value: nonHazardous },
  ];
}

export function getNeoCountPerDay(
  feedData: NeoResponse
): { date: string; count: number }[] {
  if (!feedData?.near_earth_objects) {
    return [];
  }

  return Object.entries(feedData.near_earth_objects).map(([date, neos]) => ({
    date,
    count: Array.isArray(neos) ? neos.length : 0,
  }));
}
