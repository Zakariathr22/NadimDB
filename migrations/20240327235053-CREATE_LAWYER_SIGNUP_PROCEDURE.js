'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      CREATE PROCEDURE LawyerSignUp(IN p_firstname VARCHAR(255), IN p_lastname VARCHAR(255), IN p_birthdate DATETIME, IN p_gender VARCHAR(10), IN p_email VARCHAR(255), IN p_emailVerified BOOLEAN, IN p_phone VARCHAR(20), IN p_phoneVerified BOOLEAN, IN p_salt VARCHAR(255), IN p_passwordHash VARCHAR(255), IN p_accreditation VARCHAR(255), IN p_starting_date DATETIME, IN p_naming VARCHAR(255), IN p_wilaya VARCHAR(255), IN p_municipality VARCHAR(255), IN p_headquarters VARCHAR(255), IN p_phone1 VARCHAR(20), IN p_phone2 VARCHAR(20), IN p_fax VARCHAR(20), IN p_office_email VARCHAR(255), IN p_isCompany BOOLEAN)
      BEGIN 
        DECLARE user_id INT;
        DECLARE office_id INT;
        -- Insert a new user
        INSERT INTO user (firstname, lastname, birthdate, gender, email, emailVerified, phone, phoneVerified, salt, passwordHash)
        VALUES (p_firstname, p_lastname, p_birthdate, p_gender, p_email, p_emailVerified, p_phone, p_phoneVerified, p_salt, p_passwordHash);
        SET user_id = LAST_INSERT_ID();
        -- Insert a new lawyer with the user's ID
        INSERT INTO lawyer (user_id, accreditation, starting_date, creator_id)
        VALUES (user_id, p_accreditation, p_starting_date, user_id);
        -- Insert a new office
        INSERT INTO office (naming, accreditation, wilaya, municipality, headquarters, phone1, phone2, fax, email, createdAt, isCompany)
        VALUES (p_naming, p_accreditation, p_wilaya, p_municipality, p_headquarters, p_phone1, p_phone2, p_fax, p_office_email, CURRENT_TIMESTAMP(), p_isCompany);
        SET office_id = LAST_INSERT_ID();
        -- Associate the office with the user
        UPDATE user SET office_id = office_id WHERE id = user_id;
        INSERT INTO officecreation (office_id, user_id)
        VALUES (office_id, user_id);
      END
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`DROP PROCEDURE IF EXISTS LawyerSignUp`);
  }
};
