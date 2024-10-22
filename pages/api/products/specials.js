import Product from '../../../models/product';

export default async function handler(req, res) {
  const { type } = req.query;

  try {
    let products;
    switch (type) {
      case 'dealOfTheWeek':
        products = await Product.findOne({ where: { isDealOfTheWeek: true } });
        break;
      case 'featured':
        products = await Product.findAll({ where: { isFeatured: true }, limit: 3 });
        break;
      case 'deals':
        products = await Product.findAll({ where: { isDeal: true } });
        break;
      case 'trending':
        products = await Product.findAll({ where: { isTrending: true } });
        break;
      default:
        return res.status(400).json({ message: 'Invalid request type' });
    }

    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'No products found' });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
}
