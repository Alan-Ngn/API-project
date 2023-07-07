const express = require('express');
// const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Booking, Review, ReviewImage, sequelize } = require('../../db/models');

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

router.put('/:bookingId', requireAuth, async (req, res, next) => {
    const { startDate, endDate } = req.body
    let owner = req.user
    const ownerBooked = await owner.getBookings({
        where: {
            id: req.params.bookingId
        }
    })
    const bookingById = await Booking.findByPk(req.params.bookingId)

    if(!bookingById) {
        return res.status(404).json({
            message: "Booking couldn't be found"
        })
    }
    if(!ownerBooked.length) {
        return res.status(403).json(
            {
                message: "Forbidden"
              }
        )
    }

    const spotById = await Spot.findByPk(bookingById.dataValues.spotId)
    const allBookingsBySpot = await spotById.getBookings()

    const today = Date.now()


    const bookedEndDate = new Date(ownerBooked[0].endDate)
    const bookedStartDate = new Date(ownerBooked[0].startDate)

    if(bookedEndDate.getTime() < today) {
        return res.status(403).json({
            message: "Past bookings can't be modified"
        })
    }

    const toBookEndDate = new Date(endDate)
    const toBookStartDate = new Date(startDate)


    // const spotById = await Spot.findByPk(req.params.spotId)
    // const allBookingsBySpot = await spotById.getBookings()

    let filterBookings = allBookingsBySpot.filter(booked => booked.startDate.getTime() !== bookingById.dataValues.startDate.getTime() && booked.endDate.getTime() !== bookingById.dataValues.endDate.getTime())
    const conflictErrors = {}


    for (let i = 0; i < filterBookings.length; i++) {
        const booking = filterBookings[i];

        const bookingStartDate = new Date(booking.startDate)
        const bookingEndDate = new Date(booking.endDate)


        if(toBookStartDate.getTime() <= bookingEndDate.getTime() && toBookStartDate.getTime() >= bookingStartDate.getTime()){

            conflictErrors.startDate = "Start date conflicts with an existing booking"
        }
        if(toBookEndDate.getTime() <= bookingEndDate.getTime() && toBookEndDate.getTime() >= bookingStartDate.getTime()){

            conflictErrors.endDate = "End date conflicts with an existing booking"
        }
        if(toBookStartDate.getTime() <= bookingStartDate.getTime() && toBookEndDate.getTime() >= bookingStartDate.getTime()){

            conflictErrors.startDate = "Conflicts with an existing booking"
        }

    }


    const errors = {}
    if(!endDate || !startDate || toBookEndDate.getTime() <= toBookStartDate.getTime()) errors.endDate = "endDate cannot come before startDate"
    if(Object.keys(errors).length !==0) {
        return res.status(400).json({
            message: "Bad Request",
            errors: errors
        })
    }

    if(Object.keys(conflictErrors).length !==0) {
        return res.status(403).json({
            message: "Sorry, this spot is already booked for the specified dates",
            errors: conflictErrors
        })
    }

    const updateBooking = await bookingById.update({
        startDate, endDate
    })
    return res.json(updateBooking)
})


router.delete('/:bookingId', requireAuth, async (req, res, next) => {
    let owner = req.user
    const ownerBooked = await owner.getBookings({
        where: {
            id: req.params.bookingId
        }
    })
    const bookingById = await Booking.findByPk(req.params.bookingId)
    if(!bookingById) {
        return res.status(404).json({
            message: "Booking couldn't be found"
        })
    }
    if(!ownerBooked.length) {
        return res.status(403).json(
            {
                message: "Forbidden"
              }
        )
    }
    const today = Date.now()

    const bookedStartDate = new Date(ownerBooked[0].startDate)
    if(bookedStartDate.getTime() < today) {
        return res.status(403).json({
            message: "Bookings that have been started can't be deleted"
        })
    }

    await bookingById.destroy()
    res.json({
        message: "Successfully deleted"
    })

} )
module.exports = router;
