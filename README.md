# auth-utility
A utility tool to set up the authentication feature quickly skipping the boiler plate code and tedious task.

## Features

This project provides a simple, plug-and-play Google Authentication solution with two main packages:

### @mayank/auth-core
The core package that handles the Google authentication logic and token management.

### @mayank/auth-ui
The UI package that provides ready-to-use React components for authentication.

## Installation

```bash
npm install @mayank/auth-ui
```

## Usage

Import the `GoogleAuthButton` component and use it in your React application:

```tsx
import { GoogleAuthButton } from '@mayank/auth-ui'

const App = () => {
  const googleAuthConfig = {
    clientId: "your-google-client-id",
    clientSecret: "your-google-client-secret",
    callbackURL: "http://localhost:3000/auth/google/callback"
  };

  return (
    <div>
      <GoogleAuthButton 
        config={googleAuthConfig}
        onClick={() => console.log('Google Auth clicked')}
      />
    </div>
  );
}
```

## Configuration

The component requires a configuration object with your Google OAuth credentials:

```ts
interface GoogleAuthConfig {
  clientId: string;
  clientSecret: string;
  callbackURL: string;
}
```

## Example with Next.js App Router

```tsx
'use client'

import { GoogleAuthButton } from '@mayank/auth-ui'

export default function GoogleAuthPage() {
  const googleAuthConfig = {
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: process.env.CALLBACK_URL!
  };

  return <GoogleAuthButton config={googleAuthConfig} />;
}
```

## Development

To build the packages:

```bash
npm run build
```

## License

This project is licensed under the MIT License.
