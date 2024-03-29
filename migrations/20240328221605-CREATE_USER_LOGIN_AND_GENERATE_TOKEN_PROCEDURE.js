'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      CREATE PROCEDURE UserLoginAndGenerateToken(IN p_email_or_phone VARCHAR(255), IN p_password VARCHAR(255), IN p_ip_address VARCHAR(255), IN p_user_agent VARCHAR(255), IN p_machine_name VARCHAR(255))
      BEGIN
          DECLARE user_id INT;
          DECLARE random_token VARCHAR(255);

          SELECT id INTO user_id
          FROM user
          WHERE (email = p_email_or_phone OR phone = p_email_or_phone) AND passwordHash = p_password;

          IF user_id IS NOT NULL THEN
              SET random_token = GenerateRandomToken();
              INSERT INTO \`token\` (\`token_value\`, \`user_id\`, \`expiration_date\`, \`is_active\`, \`created_at\`, \`last_used_at\`, \`ip_address\`, \`user_agent\`, \`purpose\`, \`machine_name\`, \`additional_info\`) VALUES (random_token, user_id, DATE_ADD(NOW(), INTERVAL 7 DAY), 1, NOW(), NOW(), p_ip_address, p_user_agent, 'Login', p_machine_name, NULL);
              SELECT random_token AS 'User Token';
          ELSE
              SELECT 'Invalid credentials' AS Message;
          END IF;
      END
    `);
  },

  down: async (queryInterface, Sequelize) => {
    // Drop the procedure if needed
    await queryInterface.sequelize.query(`
      DROP PROCEDURE IF EXISTS UserLoginAndGenerateToken;
    `);
  }
};
