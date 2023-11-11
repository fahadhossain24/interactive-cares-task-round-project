const TravelItinerary = require("../models/itineraries.model")

exports.createTravelItineraryService = async(data) => {
    const result = await TravelItinerary.create(data);
    return result;
}

exports.getTravelItinerariesByUserService = async(email) => {
    const result = await TravelItinerary.find({user: {email: email}});
    return result;
}

exports.getTravelItineraryService = async(id) => {
    const result = await TravelItinerary.findOne({_id: id});
    return result;
}

exports.updateTravelItineraryService = async(id, data) => {
    const result = await TravelItinerary.updateOne({_id: id}, data, {
        runValidators: true,
    });
    return result;
}

exports.deleteTravelItineraryService = async(id) => {
    const result = await TravelItinerary.deleteOne({_id: id});
    return result;
}