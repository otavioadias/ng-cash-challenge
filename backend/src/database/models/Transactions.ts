import { DataTypes, Model } from "sequelize";
import db from ".";

class Transactions extends Model {
  id!: number;
  username!: string;
  password!: string;
  accountId!: number;
}

Transactions.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
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
      allowNull: false,
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: "users",
    timestamps: false,
  }
);

export default Transactions;
