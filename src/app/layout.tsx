'use client';
import './globals.css';
import localFont from 'next/font/local';
import { Provider } from 'react-redux';
import { store } from '@/store';
import '@xyflow/react/dist/style.css';

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
      <body className={`${anakin.className} bg-hero bg-cover backdrop-blur-sm`}>
        <Provider store={store}>
          <div className="flex flex-col items-center py-12">
            <p className="text-blue-500 text-6xl">Star Wars</p>
            {children}
          </div>
        </Provider>
      </body>
    </html>
  );
}
