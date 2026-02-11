/**
 * ====================================================================
 * 🎨 THEME CONTEXT - Context API para Estado Global
 * ====================================================================
 * 
 * CONCEITOS DEMONSTRADOS:
 * 
 * 1. Context API - Compartilhar estado entre componentes sem prop drilling
 * 2. Provider Pattern - Envolver app com provider
 * 3. Custom Hook - useTheme para acessar o contexto
 * 
 * IMPORTANTE:
 * - Context API é nativo do React (funciona igual no RN)
 * - Use para estado que precisa ser acessado em múltiplos lugares
 * - Para estado complexo, considere Redux/Zustand
 * - Context causa re-render em todos os consumidores quando muda
 * 
 * QUANDO USAR:
 * - Tema (dark/light mode)
 * - Autenticação (usuário logado)
 * - Idioma/Localização
 * - Configurações globais
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';

// ============================================
// TIPOS
// ============================================
export type Theme = 'light' | 'dark';

export interface ThemeColors {
  background: string;
  surface: string;
  primary: string;
  secondary: string;
  text: string;
  textSecondary: string;
  border: string;
  error: string;
  success: string;
  warning: string;
}

interface ThemeContextData {
  theme: Theme;
  colors: ThemeColors;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

// ============================================
// CORES DOS TEMAS
// ============================================
const lightColors: ThemeColors = {
  background: '#f5f6fa',
  surface: '#ffffff',
  primary: '#3498db',
  secondary: '#2ecc71',
  text: '#2c3e50',
  textSecondary: '#7f8c8d',
  border: '#ecf0f1',
  error: '#e74c3c',
  success: '#2ecc71',
  warning: '#f39c12',
};

const darkColors: ThemeColors = {
  background: '#1a1a1a',
  surface: '#2c2c2c',
  primary: '#3498db',
  secondary: '#2ecc71',
  text: '#ffffff',
  textSecondary: '#bdc3c7',
  border: '#34495e',
  error: '#e74c3c',
  success: '#2ecc71',
  warning: '#f39c12',
};

// ============================================
// CRIAR CONTEXT
// ============================================
// Inicializar com undefined e usar type assertion
const ThemeContext = createContext<ThemeContextData | undefined>(undefined);

// ============================================
// PROVIDER
// ============================================
interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>('light');

  // Função para alternar tema
  const toggleTheme = () => {
    setThemeState(current => current === 'light' ? 'dark' : 'light');
  };

  // Função para definir tema específico
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  // Selecionar cores baseado no tema atual
  const colors = theme === 'light' ? lightColors : darkColors;

  // Valor que será fornecido pelo contexto
  const value: ThemeContextData = {
    theme,
    colors,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// ============================================
// CUSTOM HOOK para usar o contexto
// ============================================
/**
 * Hook customizado para acessar o contexto do tema
 * 
 * Uso:
 * const { theme, colors, toggleTheme } = useTheme();
 */
export function useTheme(): ThemeContextData {
  const context = useContext(ThemeContext);
  
  // Validação: garantir que está sendo usado dentro do Provider
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}

/**
 * EXEMPLO DE USO:
 * 
 * // 1. Envolver app com provider (App.tsx)
 * <ThemeProvider>
 *   <Navigation />
 * </ThemeProvider>
 * 
 * // 2. Usar em qualquer componente
 * function MyComponent() {
 *   const { theme, colors, toggleTheme } = useTheme();
 *   
 *   return (
 *     <View style={{ backgroundColor: colors.background }}>
 *       <Text style={{ color: colors.text }}>
 *         Tema atual: {theme}
 *       </Text>
 *       <Button onPress={toggleTheme} title="Alternar Tema" />
 *     </View>
 *   );
 * }
 */
