/**
 * ====================================================================
 * 📱 APP.TSX - Ponto de Entrada da Aplicação
 * ====================================================================
 * 
 * Este é o componente raiz da aplicação React Native.
 * 
 * ESTRUTURA:
 * - SafeAreaProvider: Gerencia áreas seguras (notch, home indicator)
 * - AuthProvider: Fornece contexto de autenticação global
 * - ThemeProvider: Fornece contexto de tema global
 * - Navigation: Configuração de rotas e navegação (com proteção de rotas)
 * 
 * IMPORTANTE:
 * - O SafeAreaProvider deve envolver toda a aplicação
 * - Os Providers (Auth, Theme) devem envolver o Navigation
 * - O NavigationContainer (dentro de Navigation) gerencia o estado de navegação
 */

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, ThemeProvider } from './src/contexts';
import { Navigation } from './src/navigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ThemeProvider>
          <Navigation />
        </ThemeProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

/**
 * ESTRUTURA COMUM DE UM APP REACT NATIVE:
 * 
 * App.tsx
 * └── SafeAreaProvider (áreas seguras)
 *     └── NavigationContainer (navegação)
 *         └── Navigator (Stack, Tab, etc.)
 *             └── Screens (suas telas)
 * 
 * Se usar Context API, Redux, etc:
 * 
 * App.tsx
 * └── SafeAreaProvider
 *     └── ReduxProvider / ContextProviders
 *         └── NavigationContainer
 *             └── Navigator
 *                 └── Screens
 */
