'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('User', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstname: {
        type: Sequelize.STRING(50)
      },
      lastname: {
        type: Sequelize.STRING(50)
      },
      birthdate: {
        type: Sequelize.DATE
      },
      gender: {
        type: Sequelize.STRING(10)
      },
      profilePic: {
        type: Sequelize.BLOB,
      },
      email: {
        type: Sequelize.STRING(100), // Add the email column
        allowNull: true, // Change to false if email is mandatory
      },
      emailVerified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      phone: {
        type: Sequelize.STRING(20), // Add the phone column
        allowNull: true, // Change to false if phone is mandatory
      },
      phoneVerified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      salt: {
        type: Sequelize.STRING(255)
      },
      passwordHash: {
        type: Sequelize.STRING(255)
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('User');
  }
};