"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
class Transactions extends sequelize_1.Model {
}
Transactions.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    debitedAccountId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "accounts",
            key: "id",
        },
        field: "debited_account_id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    creditedAccountId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "accounts",
            key: "id",
        },
        field: "credited_account_id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    value: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
}, {
    underscored: true,
    sequelize: _1.default,
    modelName: "users",
    timestamps: false,
});
exports.default = Transactions;
