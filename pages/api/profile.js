import { verifyJWT } from './utils/jwt';
import User from '../../models/user';
import Cart from '../../models/cart'; // Import Cart model if you have one

export default async function handler(req, res) {
  const token = req.headers.authorization?.split(' ')[1];

  // Verify if the token exists
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const user = verifyJWT(token);
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Handle different request methods
  switch (req.method) {
    case 'GET': // Handle GET requests (fetch user profile)
      try {
        const userProfile = await User.findOne({ where: { id: user.userId } });
        if (!userProfile) {
          return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(userProfile); // Send user profile data back
      } catch (error) {
        console.error('Error fetching user profile:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

    case 'DELETE': // Handle DELETE requests (delete account)
      try {
        // Delete the user's cart (if you have a Cart model)
        await Cart.destroy({ where: { userId: user.userId } });
        // Delete the user from the database
        await User.destroy({ where: { id: user.userId } });

        return res.status(200).json({ message: 'Account deleted successfully' });
      } catch (error) {
        console.error('Error deleting account:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

    default:
      res.setHeader('Allow', ['GET', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
