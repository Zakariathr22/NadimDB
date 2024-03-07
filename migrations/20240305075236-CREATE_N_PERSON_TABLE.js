'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Normal_Person', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: {
        type: Sequelize.STRING(50),
      },
      last_name: {
        type: Sequelize.STRING(50),
      },
      father_name: {
        type: Sequelize.STRING(50),
      },
      mother_last_name: {
        type: Sequelize.STRING(50),
      },
      mother_name: {
        type: Sequelize.STRING(50),
      },
      gender: {
        type: Sequelize.CHAR(1),
      },
      husband_last_name: {
        type: Sequelize.STRING(50),
      },
      date_of_birth: {
        type: Sequelize.DATE,
      },
      place_of_birth: {
        type: Sequelize.STRING(100),
      },
      NIN: {
        type: Sequelize.STRING(20),
      },
      ID_num: {
        type: Sequelize.STRING(20),
      },
      passport_num: {
        type: Sequelize.STRING(20),
      },
      job: {
        type: Sequelize.STRING(100),
      },
      family_status: {
        type: Sequelize.STRING(50),
      },
      residence: {
        type: Sequelize.STRING(255),
      },
      phone_number: {
        type: Sequelize.STRING(20),
      },
      email: {
        type: Sequelize.STRING(100),
      },
      alive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      Person_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Person',
          key: 'id',
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Normal_Person');
  },
};