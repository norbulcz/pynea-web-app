import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pynea Web App",
  description: "A React web app demonstrating Domain-Driven Design and Object-Oriented principles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
