'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
CREATE PROCEDURE AGetActiveTokens (IN p_email VARCHAR(255), IN p_token_value VARCHAR(500), IN p_ip_address VARCHAR(255), IN p_user_agent VARCHAR(255), IN p_machine_name VARCHAR(255))   BEGIN
    DECLARE user_id INT;
    DECLARE token_exists INT;

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
            SELECT 
              token_value,
              expiration_date,
              is_active,
              created_at,
              last_used_at,
              ip_address,
              user_agent,
              purpose,
              machine_name
            FROM token
            WHERE is_active = 1
               AND user_id = user_id ;

         ELSE
            -- Handle the case where the token does not exist
            SELECT 'Token does not exist or is inactive' AS message;
         END IF;

END`);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('DROP PROCEDURE IF EXISTS AGetActiveTokens;');
  }
};