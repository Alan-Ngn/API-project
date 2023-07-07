const express = require('express');
// const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Booking, Review, ReviewImage, sequelize } = require('../../db/models');

// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res, next) => {
    let owner = req.user
    const currentSpot  = await owner.getSpots()
    const imageByPk = await SpotImage.findByPk(req.params.imageId)

    if(!imageByPk){
        return res.status(404).json({
            message: "Spot Image couldn't be found"
        })
    }
    let counter = 0
    for (let i = 0; i < currentSpot.length; i++) {
        const spot = currentSpot[i];
        const findImage = await spot.getSpotImages({
            where: {
                id: req.params.imageId
            }
        })

        if(findImage.length){
            await findImage[0].destroy()
            counter +=1
        }


    }
    if(counter === 0) {
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
module.exports = router;
