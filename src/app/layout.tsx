import Header from '@/components/layout/Header';
import { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'xConsult - B2B Consulting Marketplace',
  description: 'Connect with top consulting firms for your business needs',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
