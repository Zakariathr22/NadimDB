'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
    CREATE PROCEDURE
    \`CountUserByPhone\`(IN \`phone\` VARCHAR(255))
    NOT DETERMINISTIC CONTAINS SQL SQL SECURITY DEFINER 
    SELECT COUNT(*) FROM \`user\` WHERE \`user\`.\`phone\` = phone
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      DROP PROCEDURE IF EXISTS CountUserByPhone;
    `);
  }
};