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
      { name: 'Prince Street Pizza', review: 'This place was amazing', stars: 5},
      { name: 'Space Needle', review: 'It was okay', stars: 2},
      { name: 'Costco Wholesale', review: 'Hotdog was delicious', stars: 3}
    ]
  },
  {
    renter: 'Denise Nguyen',
    spots: [
      { name: 'Costco Wholesale', review: 'I spend too much money here', stars: 3},
      { name: 'Prince Street Pizza', review: 'So good, I brought a box home on the plane.', stars: 5},
      { name: 'Space Needle', review: 'Would only go once', stars: 1}
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
        { name: spotInfo.name}
        })
      }
    }
  }
};
