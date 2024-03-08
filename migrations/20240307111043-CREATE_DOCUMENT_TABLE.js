'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Document', {
      ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      type: {
        type: Sequelize.STRING(50),
      },
      title: {
        type: Sequelize.STRING(255),
      },
      abstract: {
        type: Sequelize.TEXT,
      },
      Creator: {
        type: Sequelize.INTEGER,
        references: {
          model: 'User',
          key: 'ID',
        },
      },
      writtenFor: {
        type: Sequelize.STRING(100),
      },
      keyWords: {
        type: Sequelize.STRING(255),
      },
      status: {
        type: Sequelize.STRING(50),
      },
      lastUpdatedAt: {
        type: Sequelize.DATE,
      },
      size: {
        type: Sequelize.INTEGER,
      },
      fileType: {
        type: Sequelize.STRING(50),
      },
      location: {
        type: Sequelize.STRING(255),
      },
      folderID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Folder',
          key: 'ID',
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Document');
  },
};

//AuthorsDocumentAssociation