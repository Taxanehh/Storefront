// pages/api/contact.js
import Contact from '../../models/contact'; // Import the Contact model

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      // Use the Contact model to create a new contact entry
      await Contact.create({ name, email, message });

      return res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
      console.error('Error saving contact message:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
