'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
CREATE PROCEDURE AUpdateAccreditation (IN p_email VARCHAR(255), IN p_token_value VARCHAR(500), IN p_ip_address VARCHAR(255), IN p_user_agent VARCHAR(255), IN p_machine_name VARCHAR(255), IN p_accreditation VARCHAR(255), OUT p_is_success BOOLEAN)   BEGIN
    DECLARE user_id INT;
    DECLARE token_exists INT;

    -- Find the user_id based on the email
    SELECT id INTO user_id
    FROM user
    WHERE email = p_email;

    -- Check if the token is valid
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
        -- Update the user's gender
        UPDATE lawyer
        SET accreditation =p_accreditation
           WHERE user_id = user_id;
        SET p_is_success = TRUE;

    ELSE
             SET p_is_success = FALSE;
    END IF;

END`);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('DROP PROCEDURE IF EXISTS AUpdateAccreditation;');
  }
};