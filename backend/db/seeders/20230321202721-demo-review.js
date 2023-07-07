'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const { Spot, User, Review } = require('../models')

const reviews = [
  {
    renter: 'Thomas King',
    spots: [
      { name: 'Glorious Plot', review: 'This place was amazing', stars: 5},
      { name: 'Compost Land', review: 'It was okay', stars: 2},
      { name: 'Dirt Patch #4', review: 'Patch of dirt was quite dirty!', stars: 3}
    ]
  },
  {
    renter: 'Denise Nguyen',
    spots: [
      { name: 'Muddy Plot', review: 'Very muddy! I like it', stars: 3},
      { name: 'German Dirt Plot', review: 'Wasnt German enough', stars: 5},
      { name: 'Dirt Patch #5', review: 'Not my favorite dirt patch', stars: 1}
    ]
  }
]
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    for (let reviewInfo of reviews) {
      const rentee = await User.findOne({
        where: { firstName: reviewInfo.renter.split(' ')[0], lastName: reviewInfo.renter.split(' ')[1] }
      });
      for (let spotInfo of reviewInfo.spots){
        const spot = await Spot.findOne({
          where: { name: spotInfo.name }
        });
        await Review.create({
          spotId: spot.id,
          userId: rentee.id,
          review: spotInfo.review,
          stars: spotInfo.stars
        })
      }
    }
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    // for (let reviewInfo of reviews) {
    //   const rentee = await User.findOne({
    //     where: { firstName: reviewInfo.renter.split(' ')[0], lastName: reviewInfo.renter.split(' ')[1] }
    //   });
    //   const spot = await Spot.findAll({
    //     where: { name: reviewInfo.spots.map(ele => ele.name)}
    //   });
    //   await rentee.removeSpots(spot)
    // }
    for (let reviewInfo of reviews) {
      for (let spotInfo of reviewInfo.spots){
        await Review.destroy({ where:
        { review: spotInfo.review}
        })
      }
    }
  }
};
