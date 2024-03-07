'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('GroupPartyAssociation', {
      groupId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'GroupHierarchy', // Replace with the actual table name for groups
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

    await queryInterface.addConstraint('GroupPartyAssociation', {
      fields: ['groupId', 'partyId'],
      type: 'primary key',
      name: 'Group_Party_Association_pk',
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('GroupPartyAssociation');
  },
};
