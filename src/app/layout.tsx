import React from "react";
import "./globals.css";

interface RootLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

const RootLayout = ({ children, modal }: RootLayoutProps) => {
  return (
    <html lang="en">
      <head>
        <title>User Management App</title>
      </head>

      <body>
        {children}
        {modal}
      </body>
    </html>
  );
};

export default RootLayout;
