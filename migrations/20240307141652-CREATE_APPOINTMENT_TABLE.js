'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Appointment', {
      ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      aDate: {
        type: Sequelize.DATE,
      },
      aTime: {
        type: Sequelize.TIME,
      },
      subject: {
        type: Sequelize.STRING(255),
      },
      folderid: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Folder',
          key: 'ID',
        },
      },
      clientid: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Client',
          key: 'ID',
        },
      },
      Notes: {
        type: Sequelize.TEXT,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Appointment');
  },
};
