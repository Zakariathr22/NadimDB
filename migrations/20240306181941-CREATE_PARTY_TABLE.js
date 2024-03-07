'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Party', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      folder_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Folder',
          key: 'id',
        },
      },
      affiliation: {
        type: Sequelize.STRING(50),
      },
      as: {
        type: Sequelize.STRING(50),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Party');
  },
};
