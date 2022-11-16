'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      debitedAccountId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "accounts",
          key: "id",
        },
        field: "debited_account_id",
      },
      creditedAccountId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "accounts",
          key: "id",
        },
        field: "credited_account_id",
      },
      value: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        field: 'created_at',
      },
     });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('transactions');
  }
};