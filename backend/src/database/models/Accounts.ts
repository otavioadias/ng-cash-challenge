import { DataTypes, Model } from "sequelize";
import db from ".";

class Accounts extends Model {
  id!: number;
  balance!: number;
}

Accounts.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: "accounts",
    timestamps: false,
  }
);

export default Accounts;