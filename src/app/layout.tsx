import type { Metadata } from 'next';
import { AudioProvider } from '@/components/mission/intro/AudioContext';
import "./globals.css";

export const metadata: Metadata = {
  title: "Sứ Mệnh Lịch Sử GCCN",
  description: "Khám phá sứ mệnh lịch sử của giai cấp công nhân",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        <AudioProvider>
          {children}
        </AudioProvider>
      </body>
    </html>
  );
}
