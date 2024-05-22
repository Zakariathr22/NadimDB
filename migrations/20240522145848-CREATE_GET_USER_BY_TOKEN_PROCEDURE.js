'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
    CREATE PROCEDURE GetUserAndOfficeByToken(
      IN p_token_value VARCHAR(255),
      IN p_ip_address VARCHAR(45),
      IN p_user_agent VARCHAR(255),
      IN p_machine_name VARCHAR(255)
  )
  BEGIN
      SELECT u.id, u.firstname, u.lastname, u.birthdate, u.gender, u.profilePic, u.email, u.emailVerified, u.phone, u.phoneVerified, u.isUserCreatedPassword, u.createdAt, u.lastUpdate, u.isDeleted, u.deletedAt,
             o.naming, o.accreditation, o.wilaya, o.municipality, o.headquarters, o.phone1, o.phone2, o.fax, o.email, o.createdAt, o.lastUpdate, o.isDeleted, o.deletedAt, o.isCompany
      FROM User u
      JOIN Token t ON u.id = t.user_id
      JOIN Office o ON u.office_id = o.id
      WHERE t.token_value = p_token_value
          AND t.ip_address = p_ip_address
          AND t.user_agent = p_user_agent
          AND t.machine_name = p_machine_name
          AND t.is_active = 1
          AND t.expiration_date > NOW()
      LIMIT 1;
  END
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('DROP PROCEDURE IF EXISTS GetUserAndOfficeByToken;');
  }
};
