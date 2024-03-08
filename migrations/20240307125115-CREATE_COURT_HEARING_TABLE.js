'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CourtHearing', {
      ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      folderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Folder',
          key: 'ID',
        },
      },
      hDate: {
        type: Sequelize.DATE,
      },
      hTime: {
        type: Sequelize.TIME,
      },
      purpose: {
        type: Sequelize.STRING(50),
      },
      Notes: {
        type: Sequelize.TEXT,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('CourtHearing');
  },
};