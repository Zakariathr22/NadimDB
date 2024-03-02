'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Clerk', {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'User', // Assuming your User table name is 'User'
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', // Adjust as needed (CASCADE, SET NULL, etc.)
      },
      creator_id: {
        type: Sequelize.INTEGER,
        allowNull: true, // Change to false if creator_id is mandatory
        references: {
          model: 'User', // Assuming your User table name is 'User'
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL', // Change to 'CASCADE' or other appropriate action
      },
      blocked: {
        type: Sequelize.BOOLEAN,
        allowNull: true, // Change to false if blocked status is mandatory
        defaultValue: false, // Default value for blocked status
      },
      blocker_id: {
        type: Sequelize.INTEGER,
        allowNull: true, // Change to false if blocker_id is mandatory
        references: {
          model: 'User', // Assuming your User table name is 'User'
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL', // Change to 'CASCADE' or other appropriate action
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Clerk');
  },
};
