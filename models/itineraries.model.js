const mongoose = require('mongoose');


const itinerariesSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Travel itinerary name is required'],
        trim: true,
        lowercase: true,
    },
    date: {
        type: Date,
        require: [true, 'Travel itinerary dates is required'],
    },
    destination: {
        type: String,
        require: [true, 'Travel itinerary destination is required'],
    },
    activities: [{
        type: String,
        require: [true, 'Travel itinerary activities is required'],
    }],
    transportation: {
        mode: {
            type: String,
            enum: {
                values: ['bus', 'microbus', 'car', 'bike', 'train', 'flight', 'ship' ],
                message: '${values} can not accepted. please use bus/microbus/car/bike/train/flight/ship'
            },
            default: 'microbus',
        },
        departureLocation: {
            type: String,
            require: [true, 'departure location is required'],
            trim: true,
            lowercase: true,
        },
        departureTime: {
            type: String,
            require: [true, 'departure date is required'],
        },
        arrivalLocation: {
            type: String,
            require: [true, 'arrival location is required'],
            trim: true,
            lowercase: true,
        },
        arrivalTime: {
            type: String,
            require: [true, 'arrival date is required'],
        },
        ticketNumber: String,
    },
    accomodationDetails: {
        hotelName: {
            type: String,
            require: [true, 'hotel name is required'],
            trim: true,
            lowercase: true,
        },
        serviceCategory: {
            type: String,
            enum: {
                values: ['low', 'medium', 'high'],
                message: '${values} can not accepted. please use low/medium/high'
            },
            default: 'medium',
        },
        address: {
            type: String,
            require: [true, 'accomodation address is required'],
            trim: true,
            lowercase: true,
        },
        bookingDate: {
            type: Date,
            require: [true, 'accomodation booking date is required'],
        },
        bookingId: {
            type: String,
            require: [true, 'accomodation booking id is reqired'],
        }
    },
    user: {
        email: String,
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    }
},
{
    timestamps: true,
})


const TravelItinerary = mongoose.model('TravelItinerary', itinerariesSchema)

module.exports = TravelItinerary;