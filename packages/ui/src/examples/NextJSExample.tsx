'use client'

import { GoogleAuthButton } from "../components/GoogleAuthButton";
import { useGoogleAuth } from "../hooks/useGoogleAuth";

export default function LoginPage() {
  const googleAuthConfig = {
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "your-google-client-id",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "your-google-client-secret",
    callbackURL: "/api/auth/callback"
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign in to your account</h1>
        <GoogleAuthButton
          config={googleAuthConfig}
          onClick={() => console.log("Google Auth clicked")}
        />
        <p className="mt-4 text-center text-sm text-gray-600">
          Click the button above to sign in with Google
        </p>
      </div>
    </div>
  );
}