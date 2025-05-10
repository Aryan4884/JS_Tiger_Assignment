import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import VendorForm from '../../components/VendorForm';

export default function EditVendorPage() {
  const [vendor, setVendor] = useState(null);
  const { id } = useRouter().query;

  useEffect(() => {
    if (id) fetch(`/api/vendors/${id}`).then(res => res.json()).then(setVendor);
  }, [id]);

  return (
    <Layout>
      <h2 className="text-xl font-bold mb-4">Edit Vendor</h2>
      {vendor && <VendorForm initialData={vendor} />}
    </Layout>
  );
}
