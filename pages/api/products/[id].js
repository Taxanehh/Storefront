import Product from '../../../models/product';
import sequelize from '../utils/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query;

    try {
      await sequelize.sync();

      // Fetch the product by its ID
      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.status(200).json({ product });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
