import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Image from "next/image";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/vendors");
    }
  }, [status, router]);

  if (status === "loading") return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="flex h-screen">
      {/* Left Side - Rocket Illustration (1/3 of screen) */}
      <div className="hidden md:flex w-1/3 bg-blue-300 items-center justify-center">
        <Image
          src="/vendor-icon.png"
          alt="Vendor Icon"
          width={400}
          height={400}
          className="object-contain"
        />
      </div>

      {/* Right Side - Login Form (2/3 of screen) */}
      <div className="w-full md:w-2/3 flex items-center justify-center bg-blue-80">
        <div className="w-full max-w-xl p-10 space-y-6 shadow-xl rounded-lg border">
          <div className="flex flex-col items-center space-y-4">
            <Image
              src="/icon.png"
              alt="Store Icon"
              width={100}
              height={100}
            />
            <h2 className="text-4xl font-bold text-gray-800">Welcome</h2>
            <p className="text-base text-gray-500 text-center">
              Sign in with your Google account to manage vendors.
            </p>
          </div>

          <button
            onClick={() => signIn("google")}
            className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded hover:bg-blue-700 transition"
          >
            Login with Google
          </button>

          <p className="text-sm text-center text-gray-400">
            Trouble signing in?{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Get help
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
