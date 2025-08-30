import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import type { Restaurant } from "../../type/location/location.type.js";
import axiosInstance from "../../utils/axios.js";

// Helper function to calculate distance using Haversine formula
function getDistance(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371; // Radius of Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = { lat: 40.73061, lng: -73.935242 }; // fallback center

function LocationTracker() {
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [closestRestaurant, setClosestRestaurant] = useState<Restaurant | null>(
    null
  );

  // Detect user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => console.error(err)
    );
  }, []);

  // Fetch restaurants
  useEffect(() => {
    axiosInstance.get<Restaurant[]>("/location/restaurant").then((res) => {
      setRestaurants(res.data);
    });
  }, []);

  // Find the closest restaurant
  useEffect(() => {
    if (userLocation && restaurants.length > 0) {
      let closest: Restaurant | null = null;
      let minDistance = Infinity;

      restaurants.forEach((restaurant) => {
        const distance = getDistance(
          userLocation.lat,
          userLocation.lng,
          restaurant.lat,
          restaurant.lng
        );

        if (distance < minDistance) {
          minDistance = distance;
          closest = restaurant;
        }
      });

      setClosestRestaurant(closest);
    }
  }, [userLocation, restaurants]);

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userLocation || center}
        zoom={14}
      >
        {/* User Marker */}
        {userLocation && (
          <Marker
            position={userLocation}
            label={{ text: "You", color: "white" }}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            }}
          />
        )}

        {/* Closest Restaurant Marker */}
        {closestRestaurant && (
          <Marker
            key={closestRestaurant.id}
            position={{
              lat: closestRestaurant.lat,
              lng: closestRestaurant.lng,
            }}
            label={{ text: closestRestaurant.name, color: "black" }}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
}

export default LocationTracker;
