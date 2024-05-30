'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
    CREATE  PROCEDURE GetUserDetails(IN p_token_value VARCHAR(255), IN p_ip_address VARCHAR(45), IN p_user_agent VARCHAR(255), IN p_machine_name VARCHAR(255))
    BEGIN
        DECLARE v_user_id INT;
        DECLARE v_is_token_valid INT;
    
        SELECT user_id INTO v_user_id
        FROM Token
        WHERE token_value = p_token_value AND ip_address = p_ip_address AND user_agent = p_user_agent AND machine_name = p_machine_name AND is_active = 1 AND expiration_date > NOW();
    
        IF v_user_id IS NOT NULL THEN
            SET v_is_token_valid = 1;
        ELSE
            SET v_is_token_valid = 0;
        END IF;
    
        SELECT U.firstname, U.lastname, U.birthdate, U.gender, U.profilePic, U.email, U.phone, U.createdAt, U.lastUpdate, v_is_token_valid AS is_token_valid,
               IF(L.user_id IS NOT NULL, L.accreditation, 'clerk') AS accreditation,
               IF(L.user_id IS NOT NULL, L.starting_date, U.createdAt) AS starting_date,
               IF(L.user_id IS NOT NULL, U2.firstname, U3.firstname) AS creator_firstname,
               IF(L.user_id IS NOT NULL, U2.lastname, U3.lastname) AS creator_lastname,
               IF(L.user_id IS NOT NULL, U2.gender, U3.gender) AS creator_gender
        FROM User U
        LEFT JOIN Lawyer L ON U.id = L.user_id
        LEFT JOIN User U2 ON L.creator_id = U2.id
        LEFT JOIN Clerk C ON U.id = C.user_id
        LEFT JOIN User U3 ON C.creator_id = U3.id
        WHERE U.id = v_user_id;
    END
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('DROP PROCEDURE IF EXISTS GetUserDetails;');
  }
};