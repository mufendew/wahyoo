'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.belongsTo(models.Account, {foreignKey:'AccountId'})
    }
  };
  Transaction.init({
    AccountId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    amount: {
      type: DataTypes.BIGINT,
      validate: {
        notNull: true,
        min:0
      },
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
      },
      allowNull: false
    },
    note: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};