'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Client', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      phone1: {
        type: Sequelize.STRING(20),
      },
      phone2: {
        type: Sequelize.STRING(20),
      },
      email: {
        type: Sequelize.STRING(100),
      },
      fax: {
        type: Sequelize.STRING(20),
      },
      person_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Person', // Assuming your person table is named "Persons"
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Client');
  },
};