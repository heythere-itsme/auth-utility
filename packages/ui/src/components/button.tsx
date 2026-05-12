import React from "react";

export default function Button({ children }: { children: React.ReactNode }) {
  return (
    <button className="bg-foreground">
      {children}
    </button>
  );
}
