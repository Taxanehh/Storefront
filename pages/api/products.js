import Product from '../../models/product';
import sequelize from './utils/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Sync the model with the database
      await sequelize.sync();

      // Fetch all products from the database
      const products = await Product.findAll();

      // Send the products as the response
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
