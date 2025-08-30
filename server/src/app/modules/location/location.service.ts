import axios from 'axios';
export async function getBicycleRoute(
  fromLat: number,
  fromLng: number,
  toLat: number,
  toLng: number
) {
  const response = await axios.get(
    'https://maps.googleapis.com/maps/api/directions/json',
    {
      params: {
        origin: `${fromLat},${fromLng}`,
        destination: `${toLat},${toLng}`,
        mode: 'bicycling',
        key: process.env.GOOGLE_MAPS_API_KEY,
      },
    }
  );

  const route = response.data.routes[0]?.legs[0];
  if (!route) throw new Error('Route not found');

  return {
    distance: route.distance.text,
    duration: route.duration.text,
  };
}
