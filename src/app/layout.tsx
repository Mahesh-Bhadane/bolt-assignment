import React from "react";
import "./globals.css";

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html>
      <head>
        <title>User Management App</title>
      </head>

      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
