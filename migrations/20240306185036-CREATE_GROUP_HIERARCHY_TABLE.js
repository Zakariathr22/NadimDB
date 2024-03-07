'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('GroupHierarchy', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      parent_group_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'GroupHierarchy',
          key: 'id',
        },
      },
      Inheritor: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Person',
          key: 'id',
        },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('GroupHierarchy');
  },
};
