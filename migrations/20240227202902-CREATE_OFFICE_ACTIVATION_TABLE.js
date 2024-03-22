'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('OfficeActivation', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      ActivationDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      ExpiryDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      PaymentAmount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      PaymentDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      PaymentMethod: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      PaymentStatus: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      office_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Office', // Assuming your Office table name is 'Office'
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', // Adjust as needed (CASCADE, SET NULL, etc.)
      },
      user_id: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('OfficeActivation');
  },
};