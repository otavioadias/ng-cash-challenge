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
        field: "account_id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      creditedAccountId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "accounts",
          key: "id",
        },
        field: "account_id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      value: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
     });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('transactions');
  }
};
