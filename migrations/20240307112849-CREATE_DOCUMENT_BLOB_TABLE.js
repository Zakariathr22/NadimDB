'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('DocumentBlob', {
      DocumentId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      DocumentContent: {
        type: Sequelize.BLOB,
      },
    });

    await queryInterface.addConstraint('DocumentBlob', {
      fields: ['DocumentId'],
      type: 'foreign key',
      name: 'fk_document_blob_document_id',
      references: {
        table: 'Document',
        field: 'ID',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('DocumentBlob', 'fk_document_blob_document_id');
    await queryInterface.dropTable('DocumentBlob');
  },
};