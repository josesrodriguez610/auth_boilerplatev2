"use strict";
const bcrypt = require("bcryptjs");
const { v4, v6 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    return queryInterface.bulkInsert("Users", [
      {
        id: v4(),
        email: process.env.SEED_USER_ADMIN_EMAIL,
        active: true,
        role: "SuperAdmin",
        password: bcrypt.hashSync(
          process.env.SEED_USER_ADMIN_PASSWORD,
          bcrypt.genSaltSync(10)
        ),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Users", null, {});
  },
};
