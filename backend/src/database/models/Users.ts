import { DataTypes, Model } from "sequelize";
import db from ".";

class Users extends Model {
  id!: number;
  username!: string;
  password!: string;
  accountId!: number;
}

Users.init(
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
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accountId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "accounts",
        key: "id",
      },
      field: "account_id",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: "users",
    timestamps: false,
  }
);

export default Users;
