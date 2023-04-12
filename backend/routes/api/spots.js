const express = require('express');
// const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Booking, Review, ReviewImage, sequelize } = require('../../db/models');
const e = require('express');

// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');
const router = express.Router();

// Get all Spots
router.get('/', async (req, res, next) => {
    let { minLat, maxLat, minLng, maxLng, minPrice, maxPrice, size, page } = req.query;
    const errors = {}
    const where = {}
    if(page && (isNaN(page) || parseInt(page) < 1 || parseInt(page) > 10)) errors.page = "Page must be greater than or equal to 1"
    if(size && (isNaN(size) || parseInt(size) < 1 || parseInt(size) > 20)) errors.size = "Size must be greater than or equal to 1"
    page = parseInt(page)
    size = parseInt(size)

    if(!page) page = 1;
    if(!size) size = 20;
    const offset = size * (page - 1)

    let pagination = {}
    console.log('backend- all spots')


    if(maxLat && minLat && !isNaN(maxLat) && !isNaN(minLat)) {
        where.lat = {
            [Op.between]: [minLat, maxLat]
        }
    } else if(maxLat && !isNaN(maxLat)){
        where.lat = {
            [Op.lte]: maxLat
        }
    } else if(minLat && !isNaN(minLat)) {
        where.lat = {
            [Op.gte]: minLat
        }
    }
    if(maxLat && isNaN(maxLat)){
        errors.maxLat = "Maximum latitude is invalid"
    }
    if(minLat && isNaN(minLat)){
        errors.minLat = "Minimum latitude is invalid"
    }



    if(maxLng && minLng && !isNaN(maxLng) && !isNaN(minLng)) {
        where.lng = {
            [Op.between]: [minLng, maxLng]
        }
    } else if(maxLng && !isNaN(maxLng)){
        where.lng = {
            [Op.lte]: maxLng
        }
    } else if(minLng && !isNaN(minLng)) {
        where.lng = {
            [Op.gte]: minLng
        }
    }
    if(minLng && isNaN(minLng)){
        errors.minLng = "Minimum longitude is invalid"
    }
    if(maxLng && isNaN(maxLng)){
        errors.maxLng = "Maximum longitude is invalid"
    }



    if(minPrice && maxPrice && !isNaN(minPrice) && minPrice >=0  && !isNaN(maxPrice) && maxPrice >=0){
        where.price = {
            [Op.between]: [minPrice, maxPrice]
        }
    } else if(minPrice && !isNaN(minPrice) && minPrice >=0){
        where.price = {
            [Op.gte]: minPrice
        }
    } else if(maxPrice && !isNaN(maxPrice) && maxPrice >=0){
        where.price = {
            [Op.lte]: maxPrice
        }
    }
    if(minPrice && (isNaN(minPrice) || minPrice < 0)) errors.minPrice = "Minimum price must be greater than or equal to 0"
    if(maxPrice && (isNaN(maxPrice) || maxPrice < 0)) errors.maxPrice = "Maximum price must be greater than or equal to 0"

    if(Object.keys(errors).length !==0) {
        return res.status(400).json({
            message: "Bad Request",
            errors: errors
        })
    }

    if(page>=1 && size >=1){
        pagination.limit = size;
        pagination.offset = offset
      }

    const payload = [];

    const allSpots = await Spot.findAll({
        where,
        ...pagination
    })

    for (let i = 0; i < allSpots.length; i++) {
        const spot = allSpots[i];

        const spotReviews = await spot.getReviews(
            {
                attributes: [
                    [sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]
                ],
                raw: true
            }
        );
        const spotImage = await spot.getSpotImages(
        //     {
        //     where: {
        //         preview: true
        //     },
        //     raw: true
        // }
        )
        const spotData = spot.toJSON();
        spotData.avgRating = Math.round(spotReviews[0].avgRating *10 )/10
        if(spotImage[0]){
            spotData.previewImage = spotImage[0].url
        }
        if(!spotImage[0]){
            spotData.previewImage = null
        }
        payload.push(spotData)
    }
    return res.json({
        Spots: payload,
        page: page,
        size: size
    })
})

// Get all Spots owned by the Current User
router.get('/current', requireAuth ,async (req, res, next) => {


    const payload = [];
    let owner = req.user
    console.log(owner)
    const allSpots = await owner.getSpots()

    for (let i = 0; i < allSpots.length; i++) {
        const spot = allSpots[i];

        const spotReviews = await spot.getReviews(
            {
                attributes: [
                    [sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]
                ],
                raw: true
            }
        );
        const spotImage = await spot.getSpotImages(
        //     {
        //     where: {
        //         preview: true
        //     },
        //     raw: true
        // }
        )
        const spotData = spot.toJSON();
        spotData.avgRating = Math.round(spotReviews[0].avgRating *10 )/10
        if(spotImage[0]){
            spotData.previewImage = spotImage[0].url
        }
        if(!spotImage[0]){
            spotData.previewImage = null
        }
        payload.push(spotData)
    }
    return res.json({
        Spots: payload})

})

// Get details of a Spot from an id
router.get('/:spotId', async (req, res, next) => {
    const spotById = await Spot.findByPk(req.params.spotId)
    console.log('backend- spot details')
    if(spotById === null) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    }
    const spotReviews = await spotById.getReviews(
        {
            attributes: [
                [sequelize.fn("AVG", sequelize.col("stars")), "avgRating"],
                [sequelize.fn("COUNT", sequelize.col("review")), "numReviews"]
            ],
            raw: true
        }
    );
    const spotImage = await spotById.getSpotImages({
        attributes: ['id', 'url', 'preview'],
        raw: true
    })
    for (let i = 0; i < spotImage.length; i++) {
        const element = spotImage[i];
        if(element.preview === 1 ) {
            element.preview = true
        }
        if(element.preview === 0 ) {
            element.preview = false
        }
    }
    // if(spotImage[0].preview === 1) {
    //     spotImage[0].preview = true
    // }
    // if(spotImage[0].preview === 0) {
    //     spotImage[0].preview = false
    // }
    const spotOwner = await spotById.getUser(
        {
        attributes: ['id', 'firstName', 'lastName']
    }
    )
    console.log(spotImage)
    const spotData = spotById.toJSON();
    spotData.numReviews = spotReviews[0].numReviews
    spotData.avgRating = Math.round(spotReviews[0].avgRating *10 )/10
    if(spotImage[0]){
        spotData.SpotImages = spotImage
    }
    if(!spotImage[0]){
        spotData.SpotImages = null
    }
    spotData.Owner = spotOwner

    res.json(spotData)
})


//require auth below
router.post('/', requireAuth, async (req, res, next) => {
    const errors = {}
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    if(!address) errors.address = "Street address is required"
    if(!city) errors.city = "City is required"
    if(!state) errors.state = "State is required"
    if(!country) errors.country = "Country is required"
    if(!lat  || typeof lat !== 'number' || lat < -90 || lat > 90) errors.lat = "Latitude is not valid"
    if(!lng || typeof lng !== 'number' || lng < -180 || lng > 180) errors.lng = "Longitude is not valid"
    if(!name || name.length >=50) errors.name = "Name must be less than 50 characters"
    if(!description) errors.description = "Description is required"
    if(!price) errors.price = "Price per day is required"
    console.log('from the back end', req.user.id, errors)
    if(Object.keys(errors).length !==0) {
        return res.status(400).json({
            message: "Bad Request",
            errors: errors
        })
    }


    // try {
        const createSpot = await Spot.create({
            ownerId: req.user.id, address, city, state, country, lat, lng, name, description, price
        })
    // } catch (error) {
    //     return res.json({
    //         message: 'Bad Request'
    //     })
    // }

    // const findNewSpot = await Spot.findOne({
    //     where: {
    //         ownerId: req.user.id, address, city, state, country, lat, lng, name, description, price
    //     }
    // })

    res.status(201).json({
        id: createSpot.id,
        ownerId: createSpot.ownerId,
        address: createSpot.address,
        city: createSpot.city,
        state: createSpot.state,
        country: createSpot.country,
        lat: createSpot.lat,
        lng: createSpot.lng,
        name: createSpot.name,
        description: createSpot.description,
        price: createSpot.price,
        createdAt: createSpot.createdAt,
        updatedAt: createSpot.updatedAt,
    })
})

router.post('/:spotId/images',requireAuth, async (req, res, next) => {
    let owner = req.user
    const { url, preview } = req.body
    const missingSpot = await Spot.findByPk(req.params.spotId)
    const spotById  = await owner.getSpots({
        where: {
            id: req.params.spotId
        }
    })
    if(!missingSpot) {
        return res.status(404).json(
            {
                message: "Spot couldn't be found"
              }
        )
    }
    if(spotById.length){
        const newSpotImage = await SpotImage.create({
            spotId: spotById[0].id, url, preview
        })
        return res.json({
            id: newSpotImage.id,
            url,
            preview
        })
    } else {
        return res.status(403).json(
            {
                message: "Forbidden"
              }
        )
    }

    // const test = await SpotImage.findByPk()
    // res.json(
    //     // id: parseInt(req.params.spotId),
    //     // url,
    //     // preview
    //     newSpotImage
    // )

})



router.put('/:spotId', requireAuth, async (req, res, next) => {
    const errors = {}
    let owner = req.user
    const { address, city, state, country, lat, lng, name, description, price } = req.body

    if(!address) errors.address = "Street address is required"
    if(!city) errors.city = "City is required"
    if(!state) errors.state = "State is required"
    if(!country) errors.country = "Country is required"
    if(!lat  || typeof lat !== 'number' || lat < -90 || lat > 90) errors.lat = "Latitude is not valid"
    if(!lng || typeof lng !== 'number' || lng < -180 || lng > 180) errors.lng = "Longitude is not valid"
    if(!name || name.length >=50) errors.name = "Name must be less than 50 characters"
    if(!description) errors.description = "Description is required"
    if(!price) errors.price = "Price per day is required"

    console.log('from the back end', req.user.id, errors)

    const currentOwner  = await owner.getSpots({
        where: {
            id: req.params.spotId
        }
    })
    const spotById  = await Spot.findByPk(req.params.spotId)

    if(!spotById) {
        return res.status(404).json(
            {
                message: "Spot couldn't be found"
              }
        )
    }
    if(!currentOwner.length){
        return res.status(403).json(
            {
                message: "Forbidden"
              }
        )

    }
    if(Object.keys(errors).length !==0) {
        return res.status(400).json({
            message: "Bad Request",
            errors: errors
        })
    }
    else {
        await spotById.update({
            address, city, state, country, lat, lng, name, description, price
        })
    }




    // if(currentOwner.length){
    //     await spotById.update({
    //         address, city, state, country, lat, lng, name, description, price
    //     })

    // } else {
    //     return res.status(404).json(
    //         {
    //             message: "Spot couldn't be found"
    //           }
    //     )
    // }
    res.json(spotById)
})


router.delete('/:spotId', requireAuth, async (req, res, next) => {
    let owner = req.user
    const currentOwner  = await owner.getSpots({
        where: {
            id: req.params.spotId
        }
    })

    const spotById  = await Spot.findByPk(req.params.spotId)
    if(!spotById) {
        return res.status(404).json(
            {
                message: "Spot couldn't be found"
              }
        )
    }
    if(currentOwner.length){
        await spotById.destroy()
    } else {
        return res.status(403).json(
            {
                message: "Forbidden"
              }
        )
    }
    res.json({
        message: "Successfully deleted"
    })
})

router.get('/:spotId/reviews', async (req, res, next) => {
    const spotByPk = await Spot.findByPk(req.params.spotId)
    if(!spotByPk) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    }
    const allReviewsBySpot = await spotByPk.getReviews({
        attributes: ['id', 'userId', 'spotId', 'review', 'stars', 'createdAt', 'updatedAt']
    })
    const payload = []
    console.log('backend- spot reviews')
    for (let i = 0; i < allReviewsBySpot.length; i++) {
        const review = allReviewsBySpot[i];

        const reviewUser = await review.getUser({
            attributes: ['id', 'firstName', 'lastName']
        })
        const reviewImage = await review.getReviewImages({
            attributes: ['id', 'url']
        })

        const reviewData = review.toJSON()
        reviewData.User = reviewUser
        console.log(reviewImage)
        if(!reviewImage.length){
            reviewData.ReviewImages = null
        }
        if(reviewImage.length){
            reviewData.ReviewImages = reviewImage
        }

        payload.push(reviewData)
    }
    res.json({
        Reviews: payload
    })
})

router.post('/:spotId/reviews', requireAuth, async (req, res, next) => {
    const errors = {}
    const  { review, stars } =  req.body

    if(!review) errors.review = "Review text is required"
    if(!stars || !Number.isInteger(stars) || stars < 1 || stars > 5 ) errors.stars = "Stars must be an integer from 1 to 5"

    let currentReviewer = req.user
    const currentReview = await currentReviewer.getReviews({
        where: {
            spotId: req.params.spotId
        }
    })
    const spotValidation = await Spot.findByPk(req.params.spotId)
    if(!spotValidation) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    }

    if(currentReview.length){
        return res.status(403).json({
            message: "User already has a review for this spot"
        })
    }

    if(Object.keys(errors).length !==0) {
        return res.status(400).json({
            message: "Bad Request",
            errors: errors
        })
    }

    const reviewSpot = await Review.create({
        userId: req.user.id,
        spotId: parseInt(req.params.spotId),
        review,
        stars
    })

    res.status(201).json({
        id: reviewSpot.id,
        userId: reviewSpot.userId,
        spotId: reviewSpot.spotId,
        review: reviewSpot.review,
        stars: reviewSpot.stars,
        createdAt: reviewSpot.createdAt,
        updatedAt: reviewSpot.updatedAt,

    })
})

router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    console.log('backend-  spot boookings')
    const spotById = await Spot.findByPk(req.params.spotId)
    if(!spotById) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    }
    const bookingsBySpotId = await spotById.getBookings()

    const payload = []
    for (let i = 0; i < bookingsBySpotId.length; i++) {
        const booking = bookingsBySpotId[i];
        const bookingRenter = await booking.getUser({
            attributes: ['id', 'firstName', 'lastName']
        })

        if(spotById.ownerId === req.user.id){

            const ownerData = {}
            ownerData.User = bookingRenter.toJSON()
            ownerData.id = booking.id
            ownerData.spotId = booking.spotId
            ownerData.userId = booking.userId
            ownerData.startDate = booking.startDate
            ownerData.endDate = booking.endDate
            ownerData.createdAt = booking.createdAt
            ownerData.updatedAt = booking.updatedAt

            payload.push(ownerData)

        } else {
            const renterData = {}
            renterData.spotId = booking.spotId
            renterData.startDate = booking.startDate
            renterData.endDate = booking.endDate

            payload.push(renterData)
        }

    }



    return res.json({
        Bookings: payload
    })
})


router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const { startDate, endDate } = req.body
    let owner = req.user
    const ownerSpot = await owner.getSpots({
        where: {
            id: req.params.spotId
        }
    })
    const spotById = await Spot.findByPk(req.params.spotId)
    if(!spotById) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    }
    // const spotById = await Spot.findByPk(req.params.spotId)
    if(ownerSpot.length) {
        return res.status(403).json(
            {
                message: "Forbidden"
              }
        )
    }
    const toBookEndDate = new Date(endDate)
    const toBookStartDate = new Date(startDate)

    console.log(spotById,'spot?', req.params.spotId)
    const allBookingsBySpot = await spotById.getBookings()
    console.log('test')

    const conflictErrors = {}
    for (let i = 0; i < allBookingsBySpot.length; i++) {
        const booking = allBookingsBySpot[i];

        const bookingStartDate = new Date(booking.startDate)
        const bookingEndDate = new Date(booking.endDate)

        console.log(bookingEndDate.getTime())
        if(toBookStartDate.getTime() <= bookingEndDate.getTime() && toBookStartDate.getTime() >= bookingStartDate.getTime()){

            conflictErrors.startDate = "Start date conflicts with an existing booking"
        }
        if(toBookEndDate.getTime() <= bookingEndDate.getTime() && toBookEndDate.getTime() >= bookingStartDate.getTime()){

            conflictErrors.endDate = "End date conflicts with an existing booking"
        }
    }

    const errors = {}
    if(!endDate || !startDate || toBookEndDate.getTime() <= toBookStartDate.getTime()) errors.endDate = "endDate cannot be on or before startDate"
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

    const createBooking = await Booking.create({
        spotId: parseInt(req.params.spotId), userId: req.user.id, startDate, endDate
    })
    return res.json({
        id: createBooking.id,
        spotId: createBooking.spotId,
        userId: createBooking.userId,
        startDate: createBooking.startDate,
        endDate: createBooking.endDate,
        createdAt: createBooking.createdAt,
        updatedAt: createBooking.updatedAt
    })
})
module.exports = router;
