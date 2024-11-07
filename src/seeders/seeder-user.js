'use strict';

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

    // firstName: DataTypes.STRING,
    // lastName: DataTypes.STRING,
    // email: DataTypes.STRING,
    // phone: DataTypes.STRING,
    // role: DataTypes.STRING,
    // isActive: DataTypes.BOOLEAN,
    // password: DataTypes.STRING,
    // createAt: DataTypes.STRING,
    // updateAt: DataTypes.STRING,
    // deleteAt: DataTypes.STRING,
    return queryInterface.bulkInsert('Users', [{
      firstName: 'chuyen',
      lastName: 'pham',
      phone: "123456",
      email: 'chuyenp32@example.com',
      role: "admin",
      isActive: '1',
      password: 123456789,
      createdAt: new Date(),
      updatedAt: new Date(),
      deleteAt: new Date(),
    }]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
