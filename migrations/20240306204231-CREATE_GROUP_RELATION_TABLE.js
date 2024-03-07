'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('GroupRelation', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      group_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'GroupHierarchy',
          key: 'id',
        },
      },
      person_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Person',
          key: 'id',
        },
      },
      relation: {
        type: Sequelize.STRING(50),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('GroupRelation');
  },
};
