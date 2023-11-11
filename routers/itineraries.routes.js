const express = require('express');
const travelItineraryControllers = require('../controllers/itineraries.controller');
const verifyToken = require('../middlewares/verifyToken')

const itinerariesRouter = express.Router();

itinerariesRouter.post('/', verifyToken, travelItineraryControllers.createTravelItineries);
itinerariesRouter.get('/specific/:email', verifyToken, travelItineraryControllers.getTravelItineraries);
itinerariesRouter.route('/:id')
    .get(verifyToken, travelItineraryControllers.getTravelItinerary)
    .put(verifyToken, travelItineraryControllers.updateTravelItinerary)
    .delete(verifyToken, travelItineraryControllers.deleteTravelItinerary)


module.exports = itinerariesRouter;