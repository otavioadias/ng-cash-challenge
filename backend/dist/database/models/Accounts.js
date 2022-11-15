"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
class Accounts extends sequelize_1.Model {
}
Accounts.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    balance: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    underscored: true,
    sequelize: _1.default,
    modelName: "accounts",
    timestamps: false,
});
exports.default = Accounts;
