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

  // Fallback for unsupported methods
  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
