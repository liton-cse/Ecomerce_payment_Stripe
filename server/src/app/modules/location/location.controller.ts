import { Request, Response } from 'express';
import { getBicycleRoute } from './location.service';

const restaurants = [
  { id: 1, name: 'Pizza Hut Gulshan', lat: 23.798, lng: 90.414 },
  { id: 2, name: 'Bashundhara City Mall', lat: 23.794, lng: 90.408 },
  { id: 3, name: 'The Westin Dhaka', lat: 23.795, lng: 90.406 },
  { id: 4, name: 'Gulshan Lake Park', lat: 23.789, lng: 90.41 },
];

export const getRestaurants = (_req: Request, res: Response) => {
  res.json(restaurants);
};

export const getRoute = async (req: Request, res: Response) => {
  const { fromLat, fromLng, toLat, toLng } = req.query;
  if (!fromLat || !fromLng || !toLat || !toLng) {
    return res.status(400).json({ error: 'Missing query parameters' });
  }

  try {
    const route = await getBicycleRoute(
      Number(fromLat),
      Number(fromLng),
      Number(toLat),
      Number(toLng)
    );
    res.json(route);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to get route' });
  }
};
