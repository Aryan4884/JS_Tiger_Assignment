import dbConnect from '../../../lib/dbConnect';
import Vendor from '../../../models/Vendor';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const vendors = await Vendor.find().limit(20);
    return res.status(200).json(vendors);
  }

  if (req.method === 'POST') {
    const vendor = await Vendor.create(req.body);
    return res.status(201).json(vendor);
  }
}
