'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      CREATE PROCEDURE OldTokenUpdate(
          IN p_email VARCHAR(255),
          IN p_password VARCHAR(255)
      )
      BEGIN
          DECLARE user_id INT;

          SELECT id INTO user_id
          FROM user
          WHERE email = p_email AND passwordHash = p_password;

          IF user_id IS NOT NULL THEN
              UPDATE token
              SET is_active = 0
              WHERE user_id = user_id AND is_active = 1;
          ELSE
              SELECT 'Invalid credentials' AS Message;
          END IF;
      END
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('DROP PROCEDURE IF EXISTS OldTokenUpdate;');
  }
};
