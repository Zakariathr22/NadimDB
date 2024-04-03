'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      CREATE PROCEDURE UpdateUserPasswordAndDeactivateToken(
          IN p_token_value VARCHAR(255),
          IN p_ip_address VARCHAR(255),
          IN p_user_agent VARCHAR(255),
          IN p_machine_name VARCHAR(255),
          IN p_password_hash VARCHAR(255),
          IN p_salt VARCHAR(255)
      )
      BEGIN
          DECLARE v_user_id INT;
      
          -- Verify the IP address, user agent, machine name, and token status
          SELECT user_id INTO v_user_id FROM Token
          WHERE token_value = p_token_value
          AND ip_address = p_ip_address
          AND user_agent = p_user_agent
          AND machine_name = p_machine_name
          AND is_active = TRUE
          AND expiration_date > NOW();
      
          -- If a token is found
          IF v_user_id IS NOT NULL THEN
              -- Update the user's password hash and salt
              UPDATE user SET passwordHash = p_password_hash, salt = p_salt WHERE id = v_user_id;
      
              -- Set the token's last_used_at to the current time and is_active to false
              UPDATE Token SET last_used_at = NOW(), is_active = FALSE WHERE token_value = p_token_value;
          ELSE
              -- If no token is found, return an error message
              SELECT 'No active token found with the provided details';
          END IF;
      END;    
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('DROP PROCEDURE IF EXISTS UpdateUserPasswordAndDeactivateToken;');
  }
};