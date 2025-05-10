import { useSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center bg-gray-800 text-white px-6 py-4 shadow">
      {/* Left Section - Logo + Title */}
      <div className="flex items-center space-x-3">
  <Image
    src="/store-icon.png"
    alt="Logo"
    width={54}
    height={54}
    className="rounded-full"
  />
  <h1 className="text-2xl font-bold">Vendor Manager</h1>
</div>


      {/* Right Section */}
      {session ? (
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(prev => !prev)}
            className="flex items-center space-x-2 bg-gray-700 px-3 py-1 rounded hover:bg-gray-600 transition"
          >
            {session.user.image && (
              <Image
                src={session.user.image}
                alt="Profile"
                width={32}
                height={32}
                className="rounded-full"
              />
            )}
            <span className="text-sm">{session.user.name}</span>
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded shadow-lg z-50">
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => signIn('google')}
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded transition"
        >
          Login with Google
        </button>
      )}
    </nav>
  );
}
