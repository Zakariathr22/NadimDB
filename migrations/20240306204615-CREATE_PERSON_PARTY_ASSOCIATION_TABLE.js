'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PersonPartyAssociation', {
      personId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Person', // Replace with the actual table name for groups
          key: 'id',
        },
      },
      partyId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Party', // Replace with the actual table name for parties
          key: 'id',
        },
      },
    });

    await queryInterface.addConstraint('PersonPartyAssociation', {
      fields: ['personId', 'partyId'],
      type: 'primary key',
      name: 'Person_Party_Association_pk',
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PersonPartyAssociation');
  },
};
