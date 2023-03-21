'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const { Spot, User } = require('../models')

const spots = [
  {
    owner: 'Denise Nguyen',
    address: '400 Broad St',
    city: 'Seattle',
    state: 'WA',
    country: 'USA',
    lat: 47.6205,
    lng: -122.3493,
    name: 'Space Needle',
    description: 'Iconic, 605-ft-tall spire at the Seattle Center, with an observation deck & a rotating restaurant.',
    price: 36.75
  },
  {
    owner: 'Alan Nguyen',
    address: '1801 10th Ave NW',
    city: 'Issaquah',
    state: 'WA',
    country: 'USA',
    lat: 47.5516,
    lng: -122.0518,
    name: 'Costco Wholesale',
    description: 'Members-only warehouse selling a huge variety of items including bulk groceries, electronics & more.',
    price: 1.50
  },
  {
    owner: 'Alan Nguyen',
    address: '9161 Sunset Blvd',
    city: 'West Hollywood',
    state: 'CA',
    country: 'USA',
    lat: 34.0908,
    lng: -118.3916,
    name: 'Prince Street Pizza',
    description: 'Everyday carry-out fixture dispensing square pies & Neapolitan-style pizzas with creative toppings.',
    price: 39.00
  }
];

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    for (let spotInfo of spots) {
      const { owner, address, city, state, country, lat, lng, name, description, price } = spotInfo;
      const foundSpotOwner = await User.findOne({
        where: { firstName: spotInfo.owner.split(' ')[0], lastName: spotInfo.owner.split(' ')[1] }
      });
      await Spot.create({
        ownerId: foundSpotOwner.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
      })
    }
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(options, {
      city: spots.map(cityName => cityName.city)
    }, {});
  }
};
