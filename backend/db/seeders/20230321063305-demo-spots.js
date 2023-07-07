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
    name: 'Glorious Plot',
    description: 'More grass than dirt',
    price: 36.75
  },
  {
    owner: 'Denise Nguyen',
    address: '3213 Paradise St',
    city: 'Casper',
    state: 'WY',
    country: 'USA',
    lat: 47.6205,
    lng: -122.3493,
    name: 'Ant Paradise',
    description: 'More ants than dirt',
    price: 53.59
  },
  {
    owner: 'Denise Nguyen',
    address: '245 Citadel St',
    city: 'Colorado Springs',
    state: 'CO',
    country: 'USA',
    lat: 47.6205,
    lng: -122.3493,
    name: 'Scenic Plot of Dirt',
    description: 'Beautiful spot of dirt near the river',
    price: 78.73
  },
  {
    owner: 'Denise Nguyen',
    address: '4630 Kansas Plaza St',
    city: 'Garden City',
    state: 'KS',
    country: 'USA',
    lat: 47.6205,
    lng: -122.3493,
    name: 'One Dirt Hill',
    description: 'Scenic spot on top of a dirt mound',
    price: 356.75
  },
  {
    owner: 'Denise Nguyen',
    address: '532 Newhope St',
    city: 'Amarillo',
    state: 'TX',
    country: 'USA',
    lat: 47.6205,
    lng: -122.3493,
    name: 'Ash Plot',
    description: 'Beautiful plot of dirt surrounded by burnt trees',
    price: 336.70
  },
  {
    owner: 'Alan Nguyen',
    address: '153 10th Ave NW',
    city: 'Mesa',
    state: 'AZ',
    country: 'USA',
    lat: 47.5516,
    lng: -122.0518,
    name: 'Dirty Dirt',
    description: '400 acres of dirt',
    price: 51.50
  },
  {
    owner: 'Alan Nguyen',
    address: '9161 Sunset Blvd',
    city: 'West Hollywood',
    state: 'CA',
    country: 'USA',
    lat: 34.0908,
    lng: -118.3916,
    name: 'Soily Soil',
    description: 'Enjoy a night on patch of soil gather from all over the world',
    price: 39.00
  },
  {
    owner: 'Alan Nguyen',
    address: '1042 Tanque Verde Rd',
    city: 'Tuscon',
    state: 'AZ',
    country: 'USA',
    lat: 47.5516,
    lng: -122.0518,
    name: 'Compost Land',
    description: 'A beautiful growing piece of land',
    price: 51.50
  },
  {
    owner: 'Alan Nguyen',
    address: '9161 Sunset Blvd',
    city: 'West Hollywood',
    state: 'WA',
    country: 'USA',
    lat: 34.0908,
    lng: -118.3916,
    name: 'Trash and Dirt Plot',
    description: 'When trash meets dirt. A beautiful place at the center of Seattle',
    price: 39.00
  },
  {
    owner: 'Alan Nguyen',
    address: '353 New York Ave',
    city: 'Alamogordo',
    state: 'NM',
    country: 'USA',
    lat: 34.0908,
    lng: -118.3916,
    name: 'Muddy Plot',
    description: 'Seattle dirt mixed with seattle rain to create an awesome peace of land',
    price: 89.04
  },
  {
    owner: 'Thomas King',
    address: '7776 8th Ave NW',
    city: 'Lake',
    state: 'MA',
    country: 'USA',
    lat: 66.5516,
    lng: -123.0518,
    name: 'French Dirt Plot',
    description: 'Exotic patch of dirt from France',
    price: 300
  },
  {
    owner: 'Thomas King',
    address: '1542 Number One Rd',
    city: 'Wood',
    state: 'PA',
    country: 'USA',
    lat: 63.5516,
    lng: -126.0518,
    name: 'Spanish Dirt Plot',
    description: 'Exotic patch of dirt from Spain',
    price: 1000
  },
  {
    owner: 'Thomas King',
    address: '7423 Eastern Ave',
    city: 'Lake',
    state: 'NV',
    country: 'USA',
    lat: 66.5516,
    lng: -123.0518,
    name: 'German Dirt Plot',
    description: 'Exotic patch of dirt from Germany',
    price: 100
  },
  {
    owner: 'Thomas King',
    address: '9795 Hot Dog Ave',
    city: 'Wood',
    state: 'MT',
    country: 'USA',
    lat: 63.5516,
    lng: -126.0518,
    name: 'Polish Dirt Plot',
    description: 'Exotic patch of dirt from Poland',
    price: 35.35
  },
  {
    owner: 'Thomas King',
    address: '1535 Mustard Ave',
    city: 'Mustard',
    state: 'VA',
    country: 'USA',
    lat: 63.5516,
    lng: -126.0518,
    name: 'English Dirt Plot',
    description: 'Exotic patch of dirt from England',
    price: 59.36
  },
  {
    owner: 'Dirt Corporation',
    address: '1542 Number One Rd',
    city: 'Dirt',
    state: 'PA',
    country: 'USA',
    lat: 63.5516,
    lng: -126.0518,
    name: 'Dirt Patch #1',
    description: 'Make your own house. Tools not included',
    price: 10.00
  },
  {
    owner: 'Dirt Corporation',
    address: '1542 Number Two Rd',
    city: 'Wood',
    state: 'PA',
    country: 'USA',
    lat: 63.5516,
    lng: -126.0518,
    name: 'Dirt Patch #2',
    description: 'Make your own house. Tools not included',
    price: 1000
  },
  {
    owner: 'Dirt Corporation',
    address: '1542 Number Three Rd',
    city: 'Wood',
    state: 'PA',
    country: 'USA',
    lat: 63.5516,
    lng: -126.0518,
    name: 'Dirt Patch #3',
    description: 'Make your own house. Tools not included',
    price: 1000
  },
  {
    owner: 'Dirt Corporation',
    address: '1542 Number Four Rd',
    city: 'Wood',
    state: 'PA',
    country: 'USA',
    lat: 63.5516,
    lng: -126.0518,
    name: 'Dirt Patch #4',
    description: 'Make your own house. Tools not included',
    price: 1000
  },
  {
    owner: 'Dirt Corporation',
    address: '1542 Number Five Rd',
    city: 'Wood',
    state: 'PA',
    country: 'USA',
    lat: 63.5516,
    lng: -126.0518,
    name: 'Dirt Patch #5',
    description: 'Make your own house. Tools not included',
    price: 1000
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
