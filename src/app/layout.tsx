'use client';
import './globals.css';
import localFont from 'next/font/local';
import { Provider } from 'react-redux';
import { store } from '@/store';

const anakin = localFont({
  src: './fonts/anakinmono.ttf',
  variable: '--font-anakin',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${anakin.className} bg-hero bg-cover`}>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
