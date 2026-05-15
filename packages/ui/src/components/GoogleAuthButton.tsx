import React, { useCallback } from "react";
import { useGoogleAuth } from "@/hooks/useGoogleAuth";
import { cn } from "@/lib/utils";

export interface GoogleAuthButtonProps {
  onClick?: () => void;
  className?: string;
  config: {
    clientId: string;
    clientSecret: string;
    callbackURL: string;
  };
}

export const GoogleAuthButton = ({ config, className, onClick, ...props }: GoogleAuthButtonProps) => {
  const { signIn } = useGoogleAuth(config);

  const handleGoogleAuth = useCallback(() => {
    // Trigger the Google Auth flow
    signIn();
    onClick?.();
  }, [signIn, onClick]);

  return (
    <button
      onClick={handleGoogleAuth}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        "disabled:pointer-events-none disabled:opacity-50",
        "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        "h-11 w-full max-w-[320px] px-4",
        // Mobile Layout (Circle Override)
        "max-sm:w-12 max-sm:h-12 max-sm:rounded-full max-sm:justify-center max-sm:p-0",
        className
      )}
      {...props}
    >
      <span className="shrink-0">
        <svg className="h-5 w-5" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#EA4335"
          />
        </svg>
      </span>
      <span className="truncate max-sm:hidden ml-3">
        Continue with Google
      </span>
    </button>
  );
};