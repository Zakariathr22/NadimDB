'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('VerificationCode', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      code_value: {
        type: Sequelize.STRING(50),
        unique: true,
      },
      token: {
        type: Sequelize.STRING,
        references: {
          model: 'Token',
          key: 'token_value',
        },
      },
      recipient_type: {
        type: Sequelize.ENUM('email', 'phone'),
        allowNull: false,
      },
      recipient_address: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      expiration_date: {
        type: Sequelize.DATE,
      },
      is_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      created_at: {
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('VerificationCode');
  },
};
