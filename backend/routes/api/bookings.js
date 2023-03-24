const express = require('express');
// const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage, sequelize } = require('../../db/models');

// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.get('/current', requireAuth, async (req, res, next) => {
    const payload = []
    let booker = req.user
    const currentUserBookings = await booker.getBookings()

    for (let i = 0; i < currentUserBookings.length; i++) {
        const booking = currentUserBookings[i];

        const bookingSpot = await booking.getSpot({
            attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']
        })
        const bookingSpotImage = await bookingSpot.getSpotImages()
        const bookingSpotPreview = bookingSpot.toJSON()
        const bookingData = {}
        bookingData.id = booking.id
        bookingData.spotId = booking.spotId
        if(bookingSpotImage[0]){
            bookingSpotPreview.previewImage = bookingSpotImage[0].url
        }
        bookingData.Spot = bookingSpotPreview
        bookingData.userId = booking.userId
        bookingData.startDate = booking.startDate
        bookingData.endDate = booking.endDate
        bookingData.createdAt = booking.createdAt
        bookingData.updatedAt = booking.updatedAt
        payload.push(bookingData)
    }
    res.json({
        Bookings: payload
    })
})

module.exports = router;
