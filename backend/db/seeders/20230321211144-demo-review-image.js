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
    spot: 'Dirt Patch #5',
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

      const spotInfo = await Spot.findOne({
        where: { name: reviewImageInfo.spot }
      })

      const reviewInfo = await Review.findOne({
        where: { spotId: spotInfo.id, userId: reviewerInfo.id }
      })

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
