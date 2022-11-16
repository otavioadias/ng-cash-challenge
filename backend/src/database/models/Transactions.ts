import { DataTypes, Model } from "sequelize";
import db from ".";

class Transactions extends Model {
  id!: number;
  value!: number;
  createdAt!: Date;
}

Transactions.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    debitedAccountId: {
      type: DataTypes.INTEGER,
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
      type: DataTypes.INTEGER,
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
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: "transactions",
    timestamps: false,
  }
);

export default Transactions;