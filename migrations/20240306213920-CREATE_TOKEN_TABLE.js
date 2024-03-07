'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Token', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      token_value: {
        type: Sequelize.STRING(255),
        unique: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      expiration_date: {
        type: Sequelize.DATE,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
      },
      created_at: {
        type: Sequelize.DATE,
      },
      last_used_at: {
        type: Sequelize.DATE,
      },
      ip_address: {
        type: Sequelize.STRING(50),
      },
      user_agent: {
        type: Sequelize.STRING(255),
      },
      purpose: {
        type: Sequelize.STRING(255),
      },
      machine_name: {
        type: Sequelize.STRING(255),
      },
      additional_info: {
        type: Sequelize.STRING(255),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Token');
  },
};