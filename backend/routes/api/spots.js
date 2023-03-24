const express = require('express');
// const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Booking, Review, ReviewImage, sequelize } = require('../../db/models');

// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Get all Spots
router.get('/', async (req, res, next) => {
    const payload = [];

    const allSpots = await Spot.findAll()

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
        const spotImage = await spot.getSpotImages({
            where: {
                preview: true
            },
            raw: true
        })
        const spotData = spot.toJSON();
        spotData.avgRating = spotReviews[0].avgRating
        if(spotImage[0]){
            spotData.previewImage = spotImage[0].url
        }
        payload.push(spotData)
    }
    return res.json({
        Spots: payload})
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
        const spotImage = await spot.getSpotImages({
            where: {
                preview: true
            },
            raw: true
        })
        const spotData = spot.toJSON();
        spotData.avgRating = spotReviews[0].avgRating
        if(spotImage[0]){
            spotData.previewImage = spotImage[0].url
        }
        payload.push(spotData)
    }
    return res.json({
        Spots: payload})

})

// Get details of a Spot from an id
router.get('/:spotId', async (req, res, next) => {
    const spotById = await Spot.findByPk(req.params.spotId)
    // console.log(spotById)
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

    const spotOwner = await spotById.getUser(
        {
        attributes: ['id', 'firstName', 'lastName']
    }
    )
    console.log(spotImage)
    const spotData = spotById.toJSON();
    spotData.numReviews = spotReviews[0].numReviews
    spotData.avgRating = spotReviews[0].avgRating
    if(spotImage[0]){
        spotData.previewImage = spotImage
    }
    spotData.Owner = spotOwner

    res.json(spotData)
})


//require auth below
router.post('/', async (req, res, next) => {
    const errors = {}
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    if(!address) errors.address = "Street address is required"
    if(!city) errors.city = "City is required"
    if(!state) errors.state = "State is required"
    if(!country) errors.country = "Country is required"
    if(!lat) errors.lat = "Latitude is not valid"
    if(!lng) errors.lng = "Longitude is not valid"
    if(!name || name.length >=50) errors.name = "Name must be less than 50 characters"
    if(!description) errors.description = "Description is required"
    if(!price) errors.price = "Price per day is required"

    if(Object.keys(errors).length !==0) {
        return res.status(400).json({
            message: "Bad Request",
            errors: errors
        })
    }
    try {
        await Spot.create({
            ownerId: req.user.id, address, city, state, country, lat, lng, name, description, price
        })
    } catch (error) {
        return res.json({
            message: 'Bad Request'
        })
    }

    const findNewSpot = await Spot.findOne({
        where: {
            ownerId: req.user.id, address, city, state, country, lat, lng, name, description, price
        }
    })

    res.json(findNewSpot)
})

router.post('/:spotId/images',requireAuth, async (req, res, next) => {
    let owner = req.user
    const { url, preview } = req.body
    const spotById  = await owner.getSpots({
        where: {
            id: req.params.spotId
        }
    })
    if(spotById.length){
        await SpotImage.create({
            spotId: spotById[0].id, url, preview
        })
        console.log('DIDDDD IT')

    } else {
        return res.status(404).json(
            {
                message: "Spot couldn't be found"
              }
        )
    }

    // const test = await SpotImage.findByPk()
    res.json({
        id: req.params.spotId,
        url,
        preview
    })

})



router.put('/:spotId', requireAuth, async (req, res, next) => {
    let owner = req.user
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const currentOwner  = await owner.getSpots({
        where: {
            id: req.params.spotId
        }
    })
    const spotById  = await Spot.findByPk(req.params.spotId)

    if(currentOwner.length){
        await spotById.update({
            address, city, state, country, lat, lng, name, description, price
        })

    } else {
        return res.status(404).json(
            {
                message: "Spot couldn't be found"
              }
        )
    }
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

    if(currentOwner.length){
        await spotById.destroy()
    } else {
        return res.status(404).json(
            {
                message: "Spot couldn't be found"
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
    const allReviewsBySpot = await spotByPk.getReviews()
    const payload = []

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
        reviewData.ReviewImages = reviewImage
        payload.push(reviewData)
    }
    res.json({
        Reviews: payload
    })
})

router.post('/:spotId/reviews', requireAuth, async (req, res, next) => {
    const  { review, stars } =  req.body
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

    const reviewSpot = await Review.create({
        spotId: parseInt(req.params.spotId),
        userId: req.user.id,
        review,
        stars
    })

    res.json(reviewSpot)
})

router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {

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
    const spotById = await Spot.findByPk(req.params.spotId)
    if(!spotById) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    }
})
module.exports = router;
