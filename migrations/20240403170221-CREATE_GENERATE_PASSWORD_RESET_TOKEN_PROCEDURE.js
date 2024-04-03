'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
    CREATE PROCEDURE GeneratePasswordResetToken(
      IN p_email_or_phone VARCHAR(255),
      IN p_ip_address VARCHAR(255),
      IN p_user_agent VARCHAR(255),
      IN p_machine_name VARCHAR(255)
  )
  BEGIN
      DECLARE v_user_id INT;
      DECLARE v_random_token VARCHAR(255);
  
      -- Try to find the user by email
      SELECT id INTO v_user_id FROM user WHERE email = p_email_or_phone;
  
      -- If not found, try to find the user by phone
      IF v_user_id IS NULL THEN
          SELECT id INTO v_user_id FROM user WHERE phone = p_email_or_phone;
      END IF;
  
      -- If a user is found
      IF v_user_id IS NOT NULL THEN
          -- Generate a random token
          SET v_random_token = GenerateRandomToken();
  
          -- Insert a new record into the Token table
          INSERT INTO Token(token_value, user_id, expiration_date, is_active, created_at, ip_address, user_agent, purpose, machine_name)
          VALUES(v_random_token, v_user_id, DATE_ADD(NOW(), INTERVAL 15 HOUR_MINUTE), TRUE, NOW(), p_ip_address, p_user_agent, 'Password Reset', p_machine_name);
  
          -- Return the generated token
          SELECT v_random_token;
      ELSE
          -- If no user is found, return an error message
          SELECT 'No user found with the provided email or phone';
      END IF;
  END;
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('DROP PROCEDURE IF EXISTS GeneratePasswordResetToken;');
  }
};