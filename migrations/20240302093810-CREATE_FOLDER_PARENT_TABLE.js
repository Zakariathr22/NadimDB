'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('FolderParent', {
      folder_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Folder',
          key: 'id',
        },
      },
      parent_folder_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Folder',
          key: 'id',
        },
      },
    });

    // Add a composite primary key
    await queryInterface.addConstraint('FolderParent', {
      fields: ['folder_id', 'parent_folder_id'],
      type: 'primary key',
      name: 'folder_parent_pk',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('FolderParent');
  },
};