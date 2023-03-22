'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const { ReviewImage, Review, Spot, User } = require('../models')

const reviewImages = [
  {
    reviewer: 'Denise Nguyen',
    spot: 'Costco Wholesale',
    url: 'Picture Placeholder',
  }
];

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';

    for (let reviewImageInfo of reviewImages) {
      const { reviewer, spot, url } = reviewImageInfo
      const reviewerInfo = await User.findOne({
        where: { firstName: reviewImageInfo.reviewer.split(' ')[0], lastName: reviewImageInfo.reviewer.split(' ')[1] }
      });
      // console.log('reviewer info', reviewerInfo.id)
      const spotInfo = await Spot.findOne({
        where: { name: reviewImageInfo.spot }
      })
      // console.log('spot info', spotInfo)
      const reviewInfo = await Review.findOne({
        where: { spotId: spotInfo.id, userId: reviewerInfo.id }
      })


      // console.log('review info', reviewInfo)
      await ReviewImage.create({
        reviewId: reviewInfo.id,
        url

      })

    }
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(options, {
      url: reviewImages.map(ele => ele.url)
    }, {});
  }
};
