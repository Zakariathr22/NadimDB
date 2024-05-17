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
    await queryInterface.dropTable('Appointment');
  },
};
