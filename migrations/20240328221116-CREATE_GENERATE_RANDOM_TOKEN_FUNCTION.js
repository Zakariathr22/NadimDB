'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      CREATE FUNCTION GenerateRandomToken() RETURNS VARCHAR(255)
      BEGIN
          DECLARE i INT DEFAULT 0;
          DECLARE random_token VARCHAR(255) DEFAULT '';

          WHILE i < 255 DO
              SET random_token = CONCAT(random_token, SUBSTRING('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', FLOOR(RAND() * 62) + 1, 1));
              SET i = i + 1;
          END WHILE;

          RETURN random_token;
      END
    `);
  },

  down: async (queryInterface, Sequelize) => {
    // Drop the function if needed
    await queryInterface.sequelize.query(`
      DROP FUNCTION IF EXISTS GenerateRandomToken;
    `);
  }
};
