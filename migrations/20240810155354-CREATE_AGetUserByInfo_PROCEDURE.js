'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
CREATE PROCEDURE AGetUserByInfo (IN p_email VARCHAR(255), IN p_token_value VARCHAR(500), IN p_ip_address VARCHAR(255), IN p_user_agent VARCHAR(255), IN p_machine_name VARCHAR(255), OUT p_firstname VARCHAR(255), OUT p_lastname VARCHAR(255), OUT p_gender VARCHAR(10), OUT p_phone VARCHAR(255), OUT p_emailVerified BOOLEAN, OUT p_phoneVerified BOOLEAN, OUT p_birthdate TIMESTAMP, OUT p_createdAt TIMESTAMP, OUT p_lastUpdate TIMESTAMP, OUT p_accreditation VARCHAR(255))   BEGIN
    DECLARE user_id INT;
    DECLARE token_exists INT;
    DECLARE token_validity INT;

     SELECT id INTO user_id
     FROM user
     WHERE email = p_email;

          SELECT COUNT(*) INTO token_exists
          FROM token
          WHERE user_id = user_id
              AND token_value = p_token_value
              AND ip_address = p_ip_address
              AND user_agent = p_user_agent
              AND machine_name = p_machine_name
              AND is_active = 1
              AND expiration_date > NOW();
          IF token_exists > 0 THEN
             SELECT firstname, lastname, gender, phone, emailverified, phoneverified, birthdate, createdat, lastupdate INTO p_firstname, p_lastname, p_gender, p_phone, p_emailVerified, p_phoneVerified , p_birthdate, p_createdAt, p_lastUpdate
               FROM user
                WHERE id = user_id;
             SELECT accreditation INTO p_accreditation
             FROM lawyer
             WHERE user_id = user_id;
          ELSE
                   SET p_firstname= NULL;
                   SET p_lastname= NULL;
                   SET p_gender= NULL;
                   SET p_phone= NULL;
                   SET p_emailVerified= NULL;
                   SET p_phoneVerified= NULL;
                   SET p_birthdate= NULL;
                   SET p_createdAt= NULL;
                   SET p_lastUpdate= NULL;
                   SET p_accreditation= NULL;

          END IF;
END`);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('DROP PROCEDURE IF EXISTS AGetUserByInfo;');
  }
};