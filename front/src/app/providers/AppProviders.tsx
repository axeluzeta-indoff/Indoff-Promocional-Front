import type { PropsWithChildren } from 'react';

export function AppProviders({ children }: PropsWithChildren) {
  // Aquí más adelante: i18n, QueryClientProvider, ThemeProvider, etc.
  return <>{children}</>;
}
