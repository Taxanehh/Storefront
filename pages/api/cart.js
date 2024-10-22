import Cart from '../../models/cart';
import Product from '../../models/product'; // Assuming you have a Product model
import { verifyJWT } from '../api/utils/jwt';

export default async function handler(req, res) {
  const { method } = req;

  // Extract the token from the Authorization header
  const token = req.headers.authorization?.split(' ')[1];

  // Verify the token
  const user = verifyJWT(token);

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Set the headers to expose Authorization
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Adjust as needed
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  res.setHeader('Access-Control-Expose-Headers', 'Authorization'); // Expose Authorization header to the client

  switch (method) {
    case 'GET':
      try {
        // Fetch cart items and join them with the related product details
        const cartItems = await Cart.findAll({
          where: { userId: user.userId },
          include: [
            {
              model: Product,
              attributes: ['name', 'price', 'imageUrl'],
            },
          ],
        });

        // Return an empty array if no items are found
        if (!cartItems || cartItems.length === 0) {
          return res.status(200).json([]); // Return empty array instead of throwing error
        }

        return res.status(200).json(cartItems);
      } catch (error) {
        console.error('Error fetching cart items:', error);
        return res.status(500).json({ message: 'Error fetching cart items', error });
      }

    case 'POST':
      try {
        const { productId, quantity } = req.body;

        // Find the cart item
        const cartItem = await Cart.findOne({ where: { userId: user.userId, productId } });

        if (!cartItem) {
          // If item is not in the cart, add it
          if (quantity > 0) {
            await Cart.create({
              userId: user.userId,
              productId,
              quantity,
            });
            return res.status(200).json({ message: 'Item added to cart' });
          } else {
            return res.status(400).json({ message: 'Invalid quantity' });
          }
        } else {
          // Update quantity, remove item if quantity is zero or less
          cartItem.quantity += quantity;
          if (cartItem.quantity <= 0) {
            await Cart.destroy({ where: { userId: user.userId, productId } });
            return res.status(200).json({ message: 'Item removed from cart' });
          } else {
            await cartItem.save();
            return res.status(200).json({ message: 'Cart updated successfully' });
          }
        }
      } catch (error) {
        console.error('Error updating cart:', error);
        return res.status(500).json({ message: 'Error updating cart', error });
      }

    case 'DELETE':
      try {
        const { productId } = req.body;
        await Cart.destroy({ where: { userId: user.userId, productId } });
        return res.status(200).json({ message: 'Item removed from cart' });
      } catch (error) {
        console.error('Error removing item from cart:', error);
        return res.status(500).json({ message: 'Error removing item from cart', error });
      }

    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
