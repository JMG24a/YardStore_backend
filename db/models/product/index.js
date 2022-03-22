const { Model, DataTypes, Sequelize } = require('sequelize');
const { CATEGORY_TABLE } = require('../category');

const PRODUCT_TABLE = 'products';

const ProductSchema = {
  id:{
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  title:{
    allowNull: false,
    type: DataTypes.STRING
  },
  price:{
    allowNull: false,
    type: DataTypes.DECIMAL(10,2)
  },
  image:{
    allowNull: true,
    type: DataTypes.STRING
  },
  description:{
    allowNull: true,
    type: DataTypes.TEXT
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  categoryId:{
    field: 'category_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CATEGORY_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
}

class Product extends Model{
  static associate(models){
    this.belongsTo(models.Category, {as: 'category'});
  }

  static config(sequelize){
    return{
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: false,
    }
  }
}

module.exports = { PRODUCT_TABLE, ProductSchema, Product }
