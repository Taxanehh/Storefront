import { DataTypes } from 'sequelize';
import sequelize from '../pages/api/utils/db';
import Product from './product'; // Import Product model for association

// Define the Cart model
const Cart = sequelize.define('Cart', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // Assuming 'users' table exists
      key: 'id',
    },
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'products', // Assuming 'products' table exists
      key: 'id',
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
}, {
  tableName: 'carts', // Ensure this matches your actual table name
  timestamps: true, // CreatedAt and UpdatedAt fields
});

// Define association: A cart item belongs to a product
Cart.belongsTo(Product, { foreignKey: 'productId' });

export default Cart;
