const express = require('express');
// const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage, sequelize } = require('../../db/models');

// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.get('/current', requireAuth, async (req, res, next) => {
    const payload = [];

    let owner = req.user
    // console.log(owner,'TELTJELKTJEKLTJKLSTKLESJ:TLSJKL')
    const currentUserReviews = await owner.getReviews({
        attributes: ['id', 'userId', 'spotId', 'review', 'stars', 'createdAt', 'updatedAt']
    })
    for (let i = 0; i < currentUserReviews.length; i++) {
        const review = currentUserReviews[i];

        const reviewSpot = await review.getSpot({
            attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']
        })
        const reviewImage = await review.getReviewImages({
            attributes: ['id', 'url']
        })
        const reviewSpotImage = await reviewSpot.getSpotImages()
        const reviewSpotPreview = reviewSpot.toJSON()
        const userData = {
            id: owner.id,
            firstName: owner.firstName,
            lastName: owner.lastName
        }
        const reviewData = review.toJSON();
        if(reviewSpotImage[0]){
            reviewSpotPreview.previewImage = reviewSpotImage[0].url
        }
        reviewData.User = userData
        reviewData.Spot = reviewSpotPreview;
        reviewData.ReviewImages = reviewImage;
        payload.push(reviewData)
    }

    res.json({
        Reviews: payload
    })
})


router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    const { url } = req.body
    let currentReviewer = req.user
    const reviewer = await currentReviewer.getReviews({
        where: {
            id: req.params.reviewId
        }
    })
    if(!reviewer.length) {
        return res.status(404).json({
            message: "Review couldn't be found"
        })
    }

    const reviewImageCount = await ReviewImage.count({
        where: {
            reviewId: req.params.reviewId
        }
    })
    if(reviewImageCount >= 10) {
        return res.status(403).json({
            message: "Maximum number of images for this resource was reached"
        })
    }

    const newReviewImage = await ReviewImage.create({
        reviewId: req.params.reviewId,
        url
    })
    console.log(newReviewImage.id, newReviewImage)
    res.json({
        id: newReviewImage.id,
        url: newReviewImage.url
    })

})

router.put('/:reviewId', requireAuth, async (req, res, next) => {
    const errors = {}
    const { review, stars } = req.body
    if(!review) errors.review = "Review text is required"
    if(!stars || !Number.isInteger(stars) || stars < 1 || stars > 5 ) errors.stars = "Stars must be an integer from 1 to 5"
    let currentReviewer = req.user
    const reviewer = await currentReviewer.getReviews({
        where: {
            id: req.params.reviewId
        }
    })
    if(!reviewer.length) {
        return res.status(404).json({
            message: "Review couldn't be found"
        })
    }

    if(Object.keys(errors).length !==0) {
        return res.status(400).json({
            message: "Bad Request",
            errors: errors
        })
    }

    const reviewById = await Review.findByPk(req.params.reviewId,
        {
            attributes: ['id', 'userId', 'spotId', 'review', 'stars', 'createdAt', 'updatedAt']
        })
    const updateReview = await reviewById.update({
        review, stars
    })
    res.json(updateReview)
})

router.delete('/:reviewId', requireAuth, async (req, res, next) => {
    let currentReviewer = req.user
    const reviewer = await currentReviewer.getReviews({
        where: {
            id: req.params.reviewId
        }
    })
    if(!reviewer.length) {
        return res.status(404).json({
            message: "Review couldn't be found"
        })
    }

    const reviewById = await Review.findByPk(req.params.reviewId)
    await reviewById.destroy()

    res.json({
        message: "Successfully deleted"
    })
})
module.exports = router;
