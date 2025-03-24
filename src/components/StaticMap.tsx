"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface StaticMapProps {
  latitude: number;
  longitude: number;
  zoom?: number;
  width?: number;
  height?: number;
  markerColor?: string;
  className?: string;
}

export function StaticMap({
  latitude,
  longitude,
  zoom = 15,
  width = 800,
  height = 400,
  markerColor = "red",
  className = "",
}: StaticMapProps) {
  const [mapUrl, setMapUrl] = useState<string>("");

  useEffect(() => {
    // Replace with your actual Google Maps API key
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    
    const url = `https://maps.googleapis.com/maps/api/staticmap?`
      + `center=${latitude},${longitude}`
      + `&zoom=${zoom}`
      + `&size=${width}x${height}`
      + `&markers=color:${markerColor}%7C${latitude},${longitude}`
      + `&key=${API_KEY}`;

    setMapUrl(url);
  }, [latitude, longitude, zoom, width, height, markerColor]);

  return (
    <div className={`relative overflow-hidden rounded-lg shadow-lg ${className}`}>
      {mapUrl && (
        <Image
          src={mapUrl}
          alt="Location Map"
          width={width}
          height={height}
          className="object-cover"
        />
      )}
      <div className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-md shadow-md">
        <a
          href={`https://www.google.com/maps?q=${latitude},${longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          Open in Google Maps
        </a>
      </div>
    </div>
  );
}