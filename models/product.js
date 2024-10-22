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
    type: DataTypes.TEXT,
    allowNull: true,
  },
  isDealOfTheWeek: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isTrending: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isFeatured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, {
  timestamps: true,
});


export default Product;
