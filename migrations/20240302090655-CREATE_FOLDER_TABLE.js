'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Folder', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING(50),
      },
      office_num: {
        type: Sequelize.STRING(50),
      },
      office_num_year: {
        type: Sequelize.STRING(10),
      },
      archive_num: {
        type: Sequelize.STRING(50),
      },
      implacement: {
        type: Sequelize.STRING(50),
      },
      type: {
        type: Sequelize.STRING(50),
      },
      judicial_nature: {
        type: Sequelize.STRING(50),
      },
      judicial_authority: {
        type: Sequelize.STRING(50),
      },
      dept_room: {
        type: Sequelize.STRING(50),
      },
      court_num: {
        type: Sequelize.STRING(50),
      },
      court_num_year: {
        type: Sequelize.STRING(10),
      },
      index_num: {
        type: Sequelize.STRING(50),
      },
      index_num_year: {
        type: Sequelize.STRING(10),
      },
      judgment_date: {
        type: Sequelize.DATE,
      },
      operative_info: {
        type: Sequelize.STRING(255),
      },
      the_operative: {
        type: Sequelize.DataTypes.TEXT,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      lastUpdate: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      isDeleted: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      creator_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      office_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Office',
          key: 'id',
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Folder');
  },
};