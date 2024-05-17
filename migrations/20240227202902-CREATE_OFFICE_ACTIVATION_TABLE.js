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
          model: 'Office',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'User',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      lastUpdate: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      isDeleted: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('OfficeActivation');
  },
};