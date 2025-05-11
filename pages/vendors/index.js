import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import VendorTable from '../../components/VendorTable';
import Layout from '../../components/Layout';
import Link from 'next/link';

export default function VendorsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [vendors, setVendors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedVendorId, setSelectedVendorId] = useState(null);

  useEffect(() => {
    if (!session) return;
    fetch('/api/vendors')
      .then(res => res.json())
      .then(setVendors);
  }, [session]);

  const confirmDelete = (id) => {
    setSelectedVendorId(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    await fetch(`/api/vendors/${selectedVendorId}`, { method: 'DELETE' });
    setVendors(prev => prev.filter(v => v._id !== selectedVendorId));
    setShowModal(false);
    setSelectedVendorId(null);
  };

  if (!session) {
    return <p className="p-4">Please sign in to view vendors.</p>;
  }

  return (
    <Layout>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Vendors List</h2>
        <Link href="/vendors/new" className="bg-green-500 px-4 py-2 text-white rounded hover:bg-green-600">
          Add Vendor
        </Link>
      </div>

      <VendorTable vendors={vendors} onDelete={confirmDelete} />

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4 text-red-600">Confirm Deletion</h3>
            <p className="mb-6 text-gray-700">Are you sure you want to delete this vendor? This action cannot be undone.</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 hover:cursor-pointer transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 hover:cursor-pointer transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
