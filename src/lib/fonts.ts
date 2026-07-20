import { Noto_Sans_Georgian } from 'next/font/google';

export const georgianFont = Noto_Sans_Georgian({
  subsets: ['georgian', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-georgian',
});
