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
    url: 'https://1.bp.blogspot.com/-2QiH7jXnSDk/X2HE03oTgCI/AAAAAAACRjA/szA0ThB0PjcKoMWQZ2j51ZGWUUXSXWIPACLcBGAsYHQ/s1600/Costco%2Bexterior%2Bcostco.jpg',
    preview: true
  },
  {
    name: 'Space Needle',
    url: 'https://www.spaceneedle.com/assets/_1200x630_crop_center-center_82_none/az190903-0590.jpg?mtime=1574371859',
    preview: true
  },
  {
    name: 'Prince Street Pizza',
    url: 'https://princestreetpizzaandpub.com/images/princestreetbuilding.png',
    preview: true
  },
  {
    name: 'Island House',
    url: 'https://cdn.theatlantic.com/media/img/photo/2015/06/unusual-homes-around-the-world/h01_RTXZWGT/main_1500.jpg',
    preview: true
  },
  {
    name: 'Island House',
    url: 'https://cdn.theatlantic.com/media/img/photo/2015/06/unusual-homes-around-the-world/h01_RTXZWGT/main_1500.jpg',
    preview: false
  },
  {
    name: 'Island House',
    url: 'https://cdn.theatlantic.com/media/img/photo/2015/06/unusual-homes-around-the-world/h01_RTXZWGT/main_1500.jpg',
    preview: false
  },
  {
    name: 'Island House',
    url: 'https://cdn.theatlantic.com/media/img/photo/2015/06/unusual-homes-around-the-world/h01_RTXZWGT/main_1500.jpg',
    preview: false
  },
  {
    name: 'Island House',
    url: 'https://cdn.theatlantic.com/media/img/photo/2015/06/unusual-homes-around-the-world/h01_RTXZWGT/main_1500.jpg',
    preview: false
  },
  {
    name: 'Wood House',
    url: 'https://images.unsplash.com/photo-1525906336592-11c866dd1d4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d29vZCUyMHBpbGV8ZW58MHx8MHx8&w=1000&q=80',
    preview: true
  },  {
    name: 'Wood House',
    url: 'https://images.unsplash.com/photo-1525906336592-11c866dd1d4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d29vZCUyMHBpbGV8ZW58MHx8MHx8&w=1000&q=80',
    preview: false
  },
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
