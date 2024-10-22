// models/product.js or product.ts
import { DataTypes } from 'sequelize';
import sequelize from '../pages/api/utils/db';

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT, // Add description as TEXT
    allowNull: true, // It's okay if some products don't have a description
  }
}, {
  timestamps: true,
});

export default Product;
