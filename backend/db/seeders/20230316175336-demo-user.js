'use strict';

/** @type {import('sequelize-cli').Migration} */


const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        email: 'demo@user.io',
        username: 'AlanNguyen',
        firstName: 'Alan',
        lastName: 'Nguyen',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
        username: 'DeniseNguyen',
        firstName: 'Denise',
        lastName: 'Nguyen',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user2@user.io',
        username: 'ThomasKing',
        firstName: 'Thomas',
        lastName: 'King',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'demouser@user.io',
        username: 'DemoUser',
        firstName: 'Demo',
        lastName: 'User',
        hashedPassword: bcrypt.hashSync('demouser')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['AlanNguyen', 'DeniseNguyen', 'ThomasKing'] }
    }, {});
  }
};
