'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      CREATE PROCEDURE GetUserSaltByPhone(IN p_phone VARCHAR(20))
      BEGIN
          DECLARE user_salt VARCHAR(255);

          SELECT salt INTO user_salt
          FROM user
          WHERE phone = p_phone;

          -- Now user_salt variable contains the salt of the user with the given phone number
          SELECT user_salt AS 'User Salt';
      END
    `);
  },

  down: async (queryInterface, Sequelize) => {
    // Drop the procedure if needed
    await queryInterface.sequelize.query(`
      DROP PROCEDURE IF EXISTS GetUserSaltByPhone;
    `);
  }
};
