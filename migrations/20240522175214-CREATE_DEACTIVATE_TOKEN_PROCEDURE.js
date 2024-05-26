'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      CREATE PROCEDURE DeactivateToken(
          IN p_token_value VARCHAR(255)
      )
      BEGIN
          UPDATE Token
          SET is_active = 0
          WHERE token_value = p_token_value;
      END
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('DROP PROCEDURE IF EXISTS DeactivateToken;');
  }
};