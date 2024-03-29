'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      CREATE PROCEDURE GetUserInfoByToken(IN token_val VARCHAR(255))
      BEGIN
          SELECT User.firstname, User.lastname, User.birthdate, User.gender, User.profilePic, User.email, User.emailVerified, User.phone, User.phoneVerified, User.office_id
          FROM User
          INNER JOIN Token ON User.id = Token.user_id
          WHERE Token.token_value = token_val;
      END;
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('DROP PROCEDURE IF EXISTS GetUserInfoByToken;');
  }
};