'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('AuthorDocumentAssociation', {
      authorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'ID',
        },
      },
      documentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Document',
          key: 'ID',
        },
      },
    });
    await queryInterface.addConstraint('AuthorDocumentAssociation', {
      fields: ['authorId', 'documentId'],
      type: 'primary key',
      name: 'Author_Document_Association_pk',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('AuthorDocumentAssociation');
  },
};