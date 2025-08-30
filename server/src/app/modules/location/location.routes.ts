import { Router } from 'express';
import { getRestaurants, getRoute } from './location.controller';

const router = Router();

router.get('/restaurant', getRestaurants);
router.get('/route', getRoute);

export const LocationRoutes = router;
