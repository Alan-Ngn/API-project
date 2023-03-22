'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const { Spot, User, Booking } = require('../models')

const bookings = [
  {
    renter: 'Thomas King',
    spots: [
      { name: 'Prince Street Pizza', startDate: '2023-02-01', endDate: '2023-02-14'},
      { name: 'Space Needle', startDate: '2023-05-06', endDate: '2023-05-20'},
      { name: 'Costco Wholesale', startDate: '2022-06-07', endDate: '2022-06-08'}
    ]
  },
  {
    renter: 'Denise Nguyen',
    spots: [
      { name: 'Costco Wholesale', startDate: '2022-11-15', endDate: '2022-11-21'},
      { name: 'Prince Street Pizza', startDate: '2023-03-21', endDate: '2023-03-25'},
      { name: 'Space Needle', startDate: '2023-07-08', endDate: '2023-09-10'}
    ]
  }
]
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    for (let renteeInfo of bookings) {
      const rentee = await User.findOne({
        where: { firstName: renteeInfo.renter.split(' ')[0], lastName: renteeInfo.renter.split(' ')[1] }
      });
      for (let spotInfo of renteeInfo.spots){
        const spot = await Spot.findOne({
          where: { name: spotInfo.name }
        });
        await Booking.create({
          spotId: spot.id,
          userId: rentee.id,
          startDate: spotInfo.startDate,
          endDate: spotInfo.endDate
        })
      }
    }
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    // for (let renteeInfo of bookings) {
    //   const rentee = await User.findOne({
    //     where: { firstName: renteeInfo.renter.split(' ')[0], lastName: renteeInfo.renter.split(' ')[1] }
    //   });
    //   const spot = await Spot.findAll({
    //     where: { name: renteeInfo.spots.map(ele => ele.name)}
    //   });
    //   await rentee.removeSpots(spot)
    // }
    // for (let renteeInfo of bookings) {
    //   const rentee = await User.findOne({
    //     where: { firstName: renteeInfo.renter.split(' ')[0], lastName: renteeInfo.renter.split(' ')[1] }
    //   });
    //   for (let spotInfo of renteeInfo.spots){
    //     const spot = await Spot.findOne({
    //       where: { name: spotInfo.name }
    //     });
    //     await Booking.destroy({ where:
    //     { spotId: spot.id,
    //       userId: rentee.id,
    //       startDate: spotInfo.startDate,
    //       endDate: spotInfo.endDate}
    //     })
    //   }
    // }
    for (let renteeInfo of bookings) {
      for (let spotInfo of renteeInfo.spots){
        await Booking.destroy({ where:
        { startDate: spotInfo.startDate,
          endDate: spotInfo.endDate}
        })
      }
    }
  }
};
