'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
CREATE PROCEDURE AGetSaltByEmail (IN p_email VARCHAR(255), OUT p_salt VARCHAR(255))   BEGIN
    SELECT salt INTO p_salt
    FROM user
    WHERE email = p_email
    LIMIT 1;
END`);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('DROP PROCEDURE IF EXISTS AGetSaltByEmail;');
  }
};