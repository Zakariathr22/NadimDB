'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
    CREATE PROCEDURE
    \`CountUserByEmail\`(IN \`email\` VARCHAR(255))
    NOT DETERMINISTIC CONTAINS SQL SQL SECURITY DEFINER 
    SELECT COUNT(*) FROM \`user\` WHERE \`user\`.\`email\` = email
    LIMIT 1`);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      DROP PROCEDURE IF EXISTS CountUserByEmail;
    `);
  }
};