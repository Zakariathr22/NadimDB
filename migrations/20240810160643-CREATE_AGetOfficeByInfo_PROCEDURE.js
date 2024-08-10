'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
CREATE PROCEDURE AGetOfficeByInfo (IN p_email VARCHAR(255), IN p_token_value VARCHAR(500), IN p_ip_address VARCHAR(255), IN p_user_agent VARCHAR(255), IN p_machine_name VARCHAR(255), OUT p_naming VARCHAR(100), OUT p_accreditation VARCHAR(100), OUT p_wilaya VARCHAR(100), OUT p_municipality VARCHAR(100), OUT p_headquarters VARCHAR(100), OUT p_phone1 VARCHAR(20), OUT p_phone2 VARCHAR(20), OUT p_fax VARCHAR(20), OUT p_createdat TIMESTAMP, OUT p_lastupdate TIMESTAMP, OUT p_isdeleted BOOLEAN, OUT p_deletedat TIMESTAMP, OUT p_iscompany BOOLEAN)   BEGIN
    DECLARE office_id INT;
    DECLARE token_exists INT;
    DECLARE token_validity INT;

    SELECT office_id INTO office_id
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
            SELECT naming, accreditation, wilaya, municipality, headquarters, phone1, phone12, fax, email, createdat, lastupdate, isdeleted, deletedat, iscompany INTO p_naming, p_accreditation, p_wilaya, p_municipality, p_headquarters, p_phone1, p_phone2, p_fax, p_email, p_createdat, p_lastupdate, p_isdeleted, p_deletedat, p_iscompany
              FROM office
                WHERE office_id = office_id;
                  ELSE
                  SET p_naming= NULL;
                  SET p_accreditation= NULL;
                  SET p_wilaya= NULL;
                  SET p_municipality= NULL;
                  SET p_headquarters= NULL;
                  SET p_phone1= NULL;
                  SET p_phone2= NULL;
                  SET p_fax= NULL;
                  SET p_email= NULL;
                  SET p_createdat= NULL;
                  SET p_lastupdate= NULL;
                  SET p_isdeleted= NULL;
                  SET p_deletedat= NULL;
                  SET p_iscompany= NULL;

          END IF;
END`);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('DROP PROCEDURE IF EXISTS AGetOfficeByInfo;');
  }
};