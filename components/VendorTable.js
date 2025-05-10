// components/VendorTable.js
import Link from 'next/link';

export default function VendorTable({ vendors, onDelete }) {
  return (
    <table className="w-full table-auto border mt-4">
      <thead className="bg-gray-200">
        <tr className="text-left">
          <th className="p-3">Vendor Name</th>
          <th className="p-3">Bank Account No.</th>
          <th className="p-3">Bank Name</th>
          <th className="p-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {vendors.map(v => (
          <tr key={v._id} className="border-t hover:bg-gray-50">
            <td className="p-3">{v.vendorName}</td>
            <td className="p-3">{v.bankAccountNo}</td>
            <td className="p-3">{v.bankName}</td>
            <td className="p-3 flex space-x-2">
              <Link
                href={`/vendors/${v._id}`}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
              >
                Edit
              </Link>
              <button
                onClick={() => onDelete(v._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
