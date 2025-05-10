import dbConnect from '../../../lib/dbConnect';
import Vendor from '../../../models/Vendor';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === 'GET') {
    const vendor = await Vendor.findById(id);
    return res.status(200).json(vendor);
  }

  if (req.method === 'PUT') {
    const updated = await Vendor.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json(updated);
  }

  if (req.method === 'DELETE') {
    await Vendor.findByIdAndDelete(id);
    return res.status(204).end();
  }
}
