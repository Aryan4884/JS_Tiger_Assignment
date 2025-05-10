import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function VendorForm({ initialData = {} }) {
  const [form, setForm] = useState({
    vendorName: initialData.vendorName || '',
    bankAccountNo: initialData.bankAccountNo || '',
    bankName: initialData.bankName || '',
    addressLine1: initialData.addressLine1 || '',
    addressLine2: initialData.addressLine2 || '',
    city: initialData.city || '',
    country: initialData.country || '',
    zipCode: initialData.zipCode || '',
  });

  const router = useRouter();
  const isEdit = !!initialData._id;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/vendors${isEdit ? '/' + initialData._id : ''}`, {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) router.push('/vendors');
  };

  return (
    <div className="flex min-h-screen bg-gray-50 pl-35">
      {/* Left Side - Full-size Image */}
      <div className="relative w-1/3 hidden md:block bg-blue-100">
        <Image
          src="/create-vendor.jpg"
          alt="Vendor Illustration"
          layout="fill"
          objectFit="cover" // or "contain" if you prefer
          className="p-8"
        />
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-2/3 flex items-center justify-center p-8 bg-white">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 w-full max-w-xl p-6 border rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
            {isEdit ? 'Edit Vendor' : 'Create Vendor'}
          </h2>

          {['vendorName', 'bankAccountNo', 'bankName'].map((field) => (
  <input
    key={field}
    required
    name={field}
    placeholder={
      field === 'vendorName'
        ? 'Vendor Name'
        : field === 'bankAccountNo'
        ? 'Bank Account Number'
        : 'Bank Name'
    }
    value={form[field]}
    onChange={handleChange}
    className="w-full border border-gray-300 p-3 rounded"
  />
))}

{['addressLine1', 'addressLine2', 'city', 'country', 'zipCode'].map((field) => (
  <input
    key={field}
    name={field}
    placeholder={
      field === 'addressLine1'
        ? 'Address Line 1'
        : field === 'addressLine2'
        ? 'Address Line 2'
        : field === 'city'
        ? 'City'
        : field === 'country'
        ? 'Country'
        : 'ZIP Code'
    }
    value={form[field]}
    onChange={handleChange}
    className="w-full border border-gray-300 p-3 rounded"
  />
))}


          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition"
          >
            {isEdit ? 'Update Vendor' : 'Create Vendor'}
          </button>
        </form>
      </div>
    </div>
  );
}
