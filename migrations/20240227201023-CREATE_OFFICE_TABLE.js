'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Office', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      naming: {
        type: Sequelize.STRING(120),
        allowNull: false,
      },
      accreditation: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      wilaya: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      municipality: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      headquarters: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      phone1: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      phone2: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      fax: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
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
      },
      isCompany: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Office');
  },
};