'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const { Spot, SpotImage } = require('../models')

const spotImages = [
  {
    name: 'Costco Wholesale',
    url: 'Costco Placeholder',
    preview: true
  },
  {
    name: 'Space Needle',
    url: 'Space Needle Placeholder',
    preview: false
  },
  {
    name: 'Prince Street Pizza',
    url: 'Prince Street Pizza Placeholder',
    preview: false

  }
];

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    for (let spotImageInfo of spotImages) {
      const { name, url, preview } = spotImageInfo;
      const foundSpot = await Spot.findOne({
        where: { name: spotImageInfo.name }
      });
      await SpotImage.create({
        spotId: foundSpot.id,
        url,
        preview
      })
    }
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(options, {
      url: spotImages.map(ele => ele.url)
    }, {});
  }
};
