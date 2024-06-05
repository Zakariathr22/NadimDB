'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
    CREATE  PROCEDURE UpdateUserFullName(IN p_token_value VARCHAR(255), IN p_ip_address VARCHAR(45), IN p_user_agent VARCHAR(255), IN p_machine_name VARCHAR(255), IN p_firstname VARCHAR(45), IN p_lastname VARCHAR(45))
    proc:BEGIN
        DECLARE v_user_id INT;
        DECLARE v_office_id INT;
    
        -- Check if the token is valid
        SELECT user_id INTO v_user_id
        FROM Token
        WHERE token_value = p_token_value
        AND ip_address = p_ip_address
        AND user_agent = p_user_agent
        AND machine_name = p_machine_name
        AND is_active = 1
        AND expiration_date > NOW();
    
        IF v_user_id IS NULL THEN
            SELECT 'token not valid';
        LEAVE proc;
        END IF;
    
        -- Check if the office activation is valid
        SELECT office_id INTO v_office_id
        FROM User
        WHERE id = v_user_id;
    
        IF NOT EXISTS (
            SELECT 1
            FROM OfficeActivation
            WHERE office_id = v_office_id
            AND ExpiryDate > NOW()
        ) THEN
            SELECT 'office not activated';
        LEAVE proc;
        END IF;
    
        -- Update the user's full name
        UPDATE User
        SET firstname = p_firstname, lastname = p_lastname
        WHERE id = v_user_id;
    
        SELECT 'update success';
    END
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('DROP PROCEDURE IF EXISTS UpdateUserFullName;');
  }
};