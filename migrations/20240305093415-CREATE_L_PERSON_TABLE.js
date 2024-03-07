'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Legal_Person', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      naming: {
        type: Sequelize.STRING,
        allowNull: false
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      wilaya: {
        type: Sequelize.STRING
      },
      municipality: {
        type: Sequelize.STRING
      },
      headquarters: {
        type: Sequelize.STRING
      },
      presenter: {
        type: Sequelize.STRING
      },
      Person_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Person',
          key: 'ID'
        }
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Legal_Person');
  }
};
