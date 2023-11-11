const travelItineraryServices = require("../services/itineraries.services")
const CustomError = require("../utils/customError")

// Creating a travel itinerary
exports.createTravelItineries = async(req, res, next) => {
    try {
        const travelItinerary = await travelItineraryServices.createTravelItineraryService(req.body);
        if(!travelItinerary._id){
            const err = new CustomError('travel itinerary creation failed', 400);
            next(err);
        }
        res.status(200).json({
            status: 'success',
            message: 'Travel itinerary created successfull',
            data: travelItinerary,
        })
    } catch (error) {
        next(new CustomError(error.message, 404))
    }
}

// Retrieving all itineraries for a user.
exports.getTravelItineraries = async(req, res, next) => {
    try {
        const travelItineraryByUser = await travelItineraryServices.getTravelItinerariesByUserService(req.params.email)
        if(travelItineraryByUser.length === 0){
            const err = new CustomError('No travel itineries for the user', 400);
            next(err);
        }
        res.status(200).json({
            status: 'success',
            message: 'Travel itineries retrive successfull for the user',
            data: travelItineraryByUser,
        })
    } catch (error) {
        next(new CustomError(error.message, 404))
    }
}

// Retrieving specific itinerary
exports.getTravelItinerary = async(req, res, next) => {
    try {
        const travelItinerary = await travelItineraryServices.getTravelItineraryService(req.params.id);
        if(Object.keys(travelItinerary).length === 0){
            const err = new CustomError('No travel itinerary for this id', 400);
            next(err);
        }
        res.status(200).json({
            status: 'success',
            message: 'Travel itinerary retrive successfull',
            data: travelItinerary,
        })
    } catch (error) {
        next(new CustomError(error.message, 404))
    }
}

// Update the existing itinerary.
exports.updateTravelItinerary = async(req, res, next) => {
    try {
        const travelItinerary = await travelItineraryServices.updateTravelItineraryService(req.params.id, req.body);
        if(!travelItinerary.modifiedCount){
            const err = new CustomError('travel itinerary update failed', 400);
            next(err);
        }
        res.status(200).json({
            status: 'success',
            message: 'Travel itinerary update successfull',
            data: travelItinerary,
        })
    } catch (error) {
        next(new CustomError(error.message, 404))
    }
}

// Delete the specific itinerary.
exports.deleteTravelItinerary = async(req, res, next) => {
    try {
        const travelItinerary = await travelItineraryServices.deleteTravelItineraryService(req.params.id);
        if(!travelItinerary.deletedCount){
            const err = new CustomError('Travel itinerary delete failed', 400);
            next(err);
        }else{
            res.status(200).json({
                status: 'success',
                message: 'Travel itinerary delete successfull', 
                data: travelItinerary,
            })
        }
        
    } catch (error) {
        next(new CustomError(error.message, 404))
    }
}