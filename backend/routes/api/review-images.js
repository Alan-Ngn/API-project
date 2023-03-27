const express = require('express');
// const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Booking, Review, ReviewImage, sequelize } = require('../../db/models');

// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res, next) => {
    let currentUser = req.user
    const currentReview = await currentUser.getReviews()
    const imageByPk = await ReviewImage.findByPk(req.params.imageId)
    if(!imageByPk){
        return res.status(404).json({
            message: "Review Image couldn't be found"
        })
    }
    let counter = 0
    for (let i = 0; i < currentReview.length; i++) {
        const review = currentReview[i];
        const findReviewImages = await review.getReviewImages({
            where: {
                id: req.params.imageId
            }
        })
        if(findReviewImages.length) {
            await findReviewImages[0].destroy()
            counter += 1
        }
    }
    if(counter === 0){
        return res.status(403).json(
            {
                message: "Forbidden"
              }
        )
    }
    console.log(counter)
    res.json({
        message: "Successfully deleted"
    })
})
module.exports = router;
