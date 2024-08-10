'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
CREATE PROCEDURE AUserLoginVerification (IN p_email VARCHAR(255), IN p_passwordHash VARCHAR(255), OUT p_userExists BOOLEAN)   BEGIN
      SET p_userExists= FALSE;

IF EXISTS (
        SELECT 1 FROM user WHERE email = p_email AND passwordHash = p_passwordHash
    ) THEN
        -- Set the output parameter to true if the user exists
        SET p_userExists= TRUE;
    END IF;
END`);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('DROP PROCEDURE IF EXISTS AUserLoginVerification;');
  }
};