// models/Contact.js
import { DataTypes } from 'sequelize';
import sequelize from '../pages/api/utils/db'; // Adjust path as needed

const Contact = sequelize.define('Contact', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  timestamps: true,
});

export default Contact;
