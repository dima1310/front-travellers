import { Nunito_Sans, Unbounded } from 'next/font/google';

export const nunitoSans = Nunito_Sans({
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-nunito-sans',
  display: 'swap',
});

export const unbounded = Unbounded({
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '600', '700'],
  variable: '--font-unbounded',
  display: 'swap',
}); проверь синтаксис