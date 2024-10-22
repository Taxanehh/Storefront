import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/user';  // Your Sequelize User model
import sequelize from './utils/db';  // Your Sequelize connection

// Sync database
sequelize.sync();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      // Check if user exists
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      // Check if the password is correct
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      // Create a JWT token
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Token expires in 1 hour
      });

      // Send the token and user info back
      return res.status(200).json({
        token,
        user: { name: user.name, email: user.email },
      });
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
