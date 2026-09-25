export const metadata = {
  title: 'LinkGuard',
  description: 'Verifique a seguranca de qualquer link antes de clicar',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  );
}
