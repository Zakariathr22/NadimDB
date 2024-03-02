'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Lawyer', {
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
      accreditation: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      starting_date: {
        type: Sequelize.DATE,
        allowNull: true, // Change to false if starting_date is mandatory
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
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Lawyer');
  },
};
