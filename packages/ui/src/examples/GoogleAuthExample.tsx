import React from "react";
import { GoogleAuthButton } from "../components/GoogleAuthButton";

const GoogleAuthExample = () => {
  // Example configuration for Google Auth
  const googleAuthConfig = {
    clientId: "your-google-client-id",
    clientSecret: "your-google-client-secret",
    callbackURL: "http://localhost:3000/auth/google/callback"
  };

  const handleAuth = () => {
    console.log("Google Auth button clicked");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Google Authentication Example</h1>
      <GoogleAuthButton
        config={googleAuthConfig}
        onClick={handleAuth}
        className="mb-4"
      />
      <p className="text-sm text-gray-600">
        This is an example of how to use the GoogleAuthButton component with the integrated core functionality.
      </p>
    </div>
  );
};

export default GoogleAuthExample;