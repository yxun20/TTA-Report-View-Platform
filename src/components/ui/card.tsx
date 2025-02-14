import React from "react";

export function Card({ children }: { children: React.ReactNode }) {
  return <div className="p-4 bg-white rounded-lg shadow">{children}</div>;
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="p-2">{children}</div>;
}
