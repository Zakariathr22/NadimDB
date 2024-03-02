'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('User', 'office_id', {
      type: Sequelize.INTEGER,
      allowNull: true, // Change to false if office_id is mandatory
      references: {
        model: 'Office', // Assuming your Office table name is 'Office'
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL', // Change to 'CASCADE' or other appropriate action
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('User', 'office_id');
  },
};
