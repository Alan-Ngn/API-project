const express = require('express');
// const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, ReviewImage, sequelize } = require('../../db/models');

// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


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


module.exports = router;
