'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Activity', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      action: {
        type: Sequelize.STRING(50), // The action performed (add, update, delete)
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER, // The ID of the user who performed the action
        allowNull: false,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      tableName: {
        type: Sequelize.STRING(50), // The name of the table that was modified
        allowNull: false,
      },
      recordId: {
        type: Sequelize.INTEGER, // The ID of the record that was modified
        allowNull: false,
      },
      actionDetails: {
        type: Sequelize.TEXT, // The details of the action performed
        allowNull: false,
      },
      userAgent: {
        type: Sequelize.STRING(50), // The user agent (windows or android)
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Activity');
  },
};