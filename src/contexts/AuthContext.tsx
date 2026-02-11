/**
 * ====================================================================
 * 🔐 AUTH CONTEXT - Gerenciamento de Autenticação
 * ====================================================================
 * 
 * CONCEITOS IMPORTANTES:
 * 
 * 1. Context API para Estado Global
 * 2. AsyncStorage para Persistência de Sessão
 * 3. Token-based Authentication (simulado)
 * 4. Login/Logout Flow
 * 5. Protected Routes (rotas protegidas)
 * 6. Auto-login (restaurar sessão ao abrir app)
 * 
 * FLUXO DE AUTENTICAÇÃO:
 * ----------------------
 * 1. App inicia → Verifica AsyncStorage por token
 * 2. Se token existe → Auto-login (restaura usuário)
 * 3. Se não existe → Mostra tela de login
 * 4. Usuário faz login → Salva token no AsyncStorage
 * 5. Usuário faz logout → Remove token do AsyncStorage
 * 
 * EM PRODUÇÃO:
 * -------------
 * - Use bibliotecas como JWT para tokens reais
 * - Implemente refresh tokens
 * - Use HTTPS sempre
 * - Armazene tokens de forma segura (expo-secure-store)
 * - Implemente expiração de sessão
 * - Adicione biometria (Face ID, Touch ID)
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ============================================
// TIPOS
// ============================================

/**
 * Interface do Usuário
 * Em produção, viria do backend
 */
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: 'user' | 'admin'; // Para demonstrar autorização (permissões)
}

/**
 * Interface do Context de Autenticação
 * Define todas as funções e estados disponíveis
 */
interface AuthContextData {
  // Estado
  user: User | null;              // Usuário atual (null = não autenticado)
  loading: boolean;               // Loading ao verificar sessão
  isAuthenticated: boolean;       // Helper: true se user existe
  
  // Ações
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
}

/**
 * Props do Provider
 */
interface AuthProviderProps {
  children: React.ReactNode;
}

// ============================================
// CONTEXT
// ============================================

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// ============================================
// CONSTANTES
// ============================================

// Chaves do AsyncStorage
const STORAGE_KEY = '@POC_RN:user';
const TOKEN_KEY = '@POC_RN:token';

// Usuários mockados (em produção, viria do backend)
const MOCK_USERS = [
  {
    id: '1',
    name: 'Daniel Silva',
    email: 'daniel@example.com',
    password: '123456',
    role: 'admin' as const,
  },
  {
    id: '2',
    name: 'João Pedro',
    email: 'joao@example.com',
    password: '123456',
    role: 'user' as const,
  },
];

// ============================================
// PROVIDER
// ============================================

/**
 * AuthProvider Component
 * ----------------------
 * Envolve a aplicação e fornece o contexto de autenticação
 * 
 * RESPONSABILIDADES:
 * - Gerenciar estado do usuário
 * - Implementar login/logout
 * - Persistir sessão no AsyncStorage
 * - Restaurar sessão ao abrir app
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * useEffect para Auto-Login
   * --------------------------
   * Executa uma vez quando o app inicia
   * Verifica se existe uma sessão salva
   */
  useEffect(() => {
    loadStoredUser();
  }, []);

  /**
   * Carrega usuário do AsyncStorage
   * --------------------------------
   * Chamado ao iniciar o app
   */
  async function loadStoredUser() {
    try {
      setLoading(true);
      
      // Busca dados salvos
      const [storedUser, storedToken] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEY),
        AsyncStorage.getItem(TOKEN_KEY),
      ]);

      // Se ambos existem, restaura sessão
      if (storedUser && storedToken) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        
        console.log('✅ Sessão restaurada:', userData.name);
      } else {
        console.log('ℹ️ Nenhuma sessão encontrada');
      }
    } catch (error) {
      console.error('❌ Erro ao carregar sessão:', error);
      // Em caso de erro, limpa storage
      await AsyncStorage.multiRemove([STORAGE_KEY, TOKEN_KEY]);
    } finally {
      setLoading(false);
    }
  }

  /**
   * Sign In (Login)
   * ---------------
   * Autentica o usuário
   * 
   * EM PRODUÇÃO:
   * - Fazer requisição POST para /api/auth/login
   * - Receber token JWT do backend
   * - Validar token
   * - Salvar token de forma segura
   */
  async function signIn(email: string, password: string) {
    try {
      // Simula delay de requisição HTTP
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Busca usuário mockado
      const foundUser = MOCK_USERS.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (!foundUser) {
        throw new Error('Email ou senha inválidos');
      }

      // Remove senha do objeto (nunca armazenar senha!)
      const { password: _, ...userWithoutPassword } = foundUser;

      // Simula token JWT (em produção, viria do backend)
      const mockToken = `mock_token_${foundUser.id}_${Date.now()}`;

      // Salva no AsyncStorage
      await AsyncStorage.multiSet([
        [STORAGE_KEY, JSON.stringify(userWithoutPassword)],
        [TOKEN_KEY, mockToken],
      ]);

      // Atualiza estado
      setUser(userWithoutPassword);

      console.log('✅ Login realizado:', userWithoutPassword.name);
    } catch (error) {
      console.error('❌ Erro no login:', error);
      throw error;
    }
  }

  /**
   * Sign Out (Logout)
   * -----------------
   * Desloga o usuário
   */
  async function signOut() {
    try {
      // Remove dados do AsyncStorage
      await AsyncStorage.multiRemove([STORAGE_KEY, TOKEN_KEY]);

      // Limpa estado
      setUser(null);

      console.log('✅ Logout realizado');
    } catch (error) {
      console.error('❌ Erro no logout:', error);
      throw error;
    }
  }

  /**
   * Sign Up (Registro)
   * ------------------
   * Cria nova conta
   * 
   * EM PRODUÇÃO:
   * - Fazer requisição POST para /api/auth/register
   * - Validar força da senha
   * - Verificar se email já existe
   * - Enviar email de confirmação
   */
  async function signUp(name: string, email: string, password: string) {
    try {
      // Simula delay de requisição HTTP
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Valida se email já existe
      const emailExists = MOCK_USERS.some(
        u => u.email.toLowerCase() === email.toLowerCase()
      );

      if (emailExists) {
        throw new Error('Email já cadastrado');
      }

      // Cria novo usuário
      const newUser = {
        id: String(Date.now()),
        name,
        email,
        role: 'user' as const,
      };

      // Simula token JWT
      const mockToken = `mock_token_${newUser.id}_${Date.now()}`;

      // Salva no AsyncStorage
      await AsyncStorage.multiSet([
        [STORAGE_KEY, JSON.stringify(newUser)],
        [TOKEN_KEY, mockToken],
      ]);

      // Atualiza estado
      setUser(newUser);

      console.log('✅ Cadastro realizado:', newUser.name);
    } catch (error) {
      console.error('❌ Erro no cadastro:', error);
      throw error;
    }
  }

  // ============================================
  // PROVIDER VALUE
  // ============================================

  const value: AuthContextData = {
    user,
    loading,
    isAuthenticated: !!user,
    signIn,
    signOut,
    signUp,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// ============================================
// HOOK CUSTOMIZADO
// ============================================

/**
 * useAuth Hook
 * ------------
 * Hook para acessar o contexto de autenticação
 * 
 * USO:
 * const { user, signIn, signOut } = useAuth();
 */
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }

  return context;
}

/**
 * ====================================================================
 * 📖 NOTAS IMPORTANTES - AUTENTICAÇÃO EM PRODUÇÃO
 * ====================================================================
 * 
 * 1. SEGURANÇA DE TOKENS
 *    ❌ NÃO use AsyncStorage para tokens sensíveis em PRODUÇÃO
 *    ✅ USE expo-secure-store (criptografia nativa)
 *    ✅ USE react-native-keychain (iOS Keychain, Android Keystore)
 * 
 * 2. TOKENS JWT
 *    - Access Token: Curta duração (15 min)
 *    - Refresh Token: Longa duração (7 dias)
 *    - Renovar access token automaticamente
 * 
 * 3. VALIDAÇÃO DE SENHA
 *    - Mínimo 8 caracteres
 *    - Letra maiúscula + minúscula + número + caractere especial
 *    - Use bibliotecas como validator.js
 * 
 * 4. PROTEÇÃO CONTRA ATAQUES
 *    - Rate limiting (limitar tentativas de login)
 *    - CAPTCHA após N tentativas falhas
 *    - 2FA (Two-Factor Authentication)
 *    - Biometria (Face ID, Touch ID)
 * 
 * 5. HTTPS SEMPRE
 *    - NUNCA envie credenciais por HTTP
 *    - Use SSL/TLS certificates
 * 
 * 6. LOGOUT AUTOMÁTICO
 *    - Implementar expiração de sessão
 *    - Logout ao detectar token inválido
 *    - Logout ao app ficar em background por muito tempo
 * 
 * 7. AUTORIZAÇÃO (Permissões)
 *    - Verificar role do usuário (admin, user, etc.)
 *    - Implementar RBAC (Role-Based Access Control)
 *    - Validar permissões no backend também
 * 
 * EXEMPLO DE IMPLEMENTAÇÃO REAL:
 * --------------------------------
 * 
 * import * as SecureStore from 'expo-secure-store';
 * 
 * // Salvar token
 * await SecureStore.setItemAsync('token', token);
 * 
 * // Recuperar token
 * const token = await SecureStore.getItemAsync('token');
 * 
 * // Headers de autenticação
 * const response = await fetch('https://api.example.com/user', {
 *   headers: {
 *     'Authorization': `Bearer ${token}`,
 *   },
 * });
 * 
 * BIBLIOTECAS ÚTEIS:
 * ------------------
 * - expo-secure-store: Armazenamento seguro
 * - expo-local-authentication: Biometria
 * - jwt-decode: Decodificar JWT
 * - axios: HTTP client (interceptors para auth)
 * - react-hook-form: Formulários com validação
 */
