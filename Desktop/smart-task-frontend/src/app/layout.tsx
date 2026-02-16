import type { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "TaskApp - Task Management",
  description: "Manage your tasks efficiently with TaskApp",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Toaster position="top-right" />
          <footer className="bg-gray-800 text-gray-300 py-8">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <p>&copy; 2026 TaskApp. All rights reserved.</p>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
