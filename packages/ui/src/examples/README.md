# Usage Examples

This directory contains examples of how to use the GoogleAuthButton component in different contexts.

## Basic Usage

```tsx
import { GoogleAuthButton } from '@mayank/auth-ui'

const App = () => {
  const googleAuthConfig = {
    clientId: "your-google-client-id",
    clientSecret: "your-google-client-secret",
    callbackURL: "http://localhost:3000/auth/google/callback"
  };

  return (
    <GoogleAuthButton 
      config={googleAuthConfig}
      onClick={() => console.log('Google Auth clicked')}
    />
  );
};
```

## Next.js App Router Usage

```tsx
'use client'

import { GoogleAuthButton } from '@mayank/auth-ui'

export default function GoogleAuthPage() {
  const googleAuthConfig = {
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/callback"
  };

  return (
    <GoogleAuthButton 
      config={googleAuthConfig}
      onClick={() => console.log('Google Auth clicked')}
    />
  );
}
```

## Configuration

The component requires the following configuration object:

```ts
interface GoogleAuthConfig {
  clientId: string;
  clientSecret: string;
  callbackURL: string;
}
```