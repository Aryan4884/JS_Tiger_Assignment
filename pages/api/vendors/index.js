import dbConnect from '../../../lib/dbConnect';
import Vendor from '../../../models/Vendor';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const vendors = await Vendor.find().limit(20);
      return res.status(200).json(vendors);
    } catch (err) {
      console.error('GET /vendors error:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  if (req.method === 'POST') {
    try {
      const vendor = await Vendor.create(req.body);
      return res.status(201).json(vendor);
    } catch (err) {
      console.error('POST /vendors error:', err);
      return res.status(500).json({ error: 'Failed to create vendor', details: err.message });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
