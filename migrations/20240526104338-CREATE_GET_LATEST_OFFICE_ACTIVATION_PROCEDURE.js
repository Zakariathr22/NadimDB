'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
    CREATE  PROCEDURE GetLatestOfficeActivation(IN p_token_value VARCHAR(255), IN p_ip_address VARCHAR(255), IN p_user_agent VARCHAR(255), IN p_machine_name VARCHAR(255))
    BEGIN
        DECLARE v_is_token_valid BOOLEAN;
        DECLARE v_office_activation_id INT;
    
        SELECT 
            (expiration_date > NOW() AND is_active = 1) INTO v_is_token_valid
        FROM 
            token
        WHERE 
            token_value = p_token_value AND ip_address = p_ip_address AND user_agent = p_user_agent AND machine_name = p_machine_name;
    
        IF v_is_token_valid THEN
            SELECT 
                id INTO v_office_activation_id
            FROM 
                officeactivation
            WHERE 
                office_id IN (SELECT office_id FROM user WHERE id IN (SELECT user_id FROM token WHERE token_value = p_token_value))
            ORDER BY 
                ExpiryDate DESC
            LIMIT 1;
    
            SELECT 
                v_is_token_valid AS 'IsTokenValid',
                ActivationDate, 
                ExpiryDate, 
                PaymentAmount, 
                PaymentDate, 
                PaymentMethod, 
                PaymentStatus, 
                office_id, 
                createdAt
            FROM 
                officeactivation
            WHERE 
                id = v_office_activation_id AND 
                ExpiryDate >= NOW();
        ELSE
            SELECT 
                v_is_token_valid AS 'IsTokenValid', 
                NULL AS 'OfficeActivationId';
        END IF;
    END
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('DROP PROCEDURE IF EXISTS GetLatestOfficeActivation;');
  }
};