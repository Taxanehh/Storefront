import bcrypt from 'bcryptjs';
import User from '../../models/user';
import sequelize from './utils/db';

sequelize.sync();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    try {
      // Check if the email already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email is already in use' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const newUser = await User.create({ name, email, password: hashedPassword });

      // Return success message
      return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Error creating user', error: error.message });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
