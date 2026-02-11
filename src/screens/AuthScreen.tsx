/**
 * ====================================================================
 * 🔐 AUTH SCREEN - Tela de Autenticação
 * ====================================================================
 * 
 * CONCEITOS DEMONSTRADOS:
 * 
 * 1. Formulário de Login/Registro
 * 2. Validação de Email e Senha
 * 3. Estados de Loading
 * 4. Error Handling
 * 5. Navegação Condicional (após login)
 * 6. KeyboardAvoidingView para melhor UX
 * 7. Alternância entre modos (Login/Registro)
 * 
 * FLUXO:
 * ------
 * 1. Usuário preenche email e senha
 * 2. Valida campos
 * 3. Chama signIn() do AuthContext
 * 4. Se sucesso, Navigation automática (feita pelo Navigation.tsx)
 * 5. Se erro, mostra mensagem
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';

type AuthMode = 'login' | 'signup';

export default function AuthScreen() {
  // ============================================
  // HOOKS & STATE
  // ============================================
  
  const { signIn, signUp } = useAuth();
  
  // Modo: Login ou Cadastro
  const [mode, setMode] = useState<AuthMode>('login');
  
  // Campos do formulário
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Estados de UI
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});

  // ============================================
  // VALIDAÇÃO
  // ============================================

  /**
   * Valida Email
   * Regex básico para validação de email
   */
  function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Valida Senha
   * Mínimo 6 caracteres (em produção, use regras mais fortes)
   */
  function validatePassword(password: string): boolean {
    return password.length >= 6;
  }

  /**
   * Valida todos os campos
   */
  function validateForm(): boolean {
    const newErrors: typeof errors = {};

    // Valida nome (apenas no modo cadastro)
    if (mode === 'signup' && !name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    // Valida email
    if (!email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Email inválido';
    }

    // Valida senha
    if (!password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (!validatePassword(password)) {
      newErrors.password = 'Senha deve ter no mínimo 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // ============================================
  // HANDLERS
  // ============================================

  /**
   * Handle Submit
   * Executa login ou cadastro baseado no modo
   */
  async function handleSubmit() {
    // Limpa erros anteriores
    setErrors({});

    // Valida formulário
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      if (mode === 'login') {
        await signIn(email, password);
        // Navegação automática é feita pelo Navigation.tsx
      } else {
        await signUp(name, email, password);
        // Navegação automática é feita pelo Navigation.tsx
      }
    } catch (error: any) {
      // Mostra erro ao usuário
      Alert.alert(
        'Erro',
        error.message || 'Ocorreu um erro. Tente novamente.',
        [{ text: 'OK' }]
      );
    } finally {
      setLoading(false);
    }
  }

  /**
   * Toggle Mode
   * Alterna entre Login e Cadastro
   */
  function toggleMode() {
    setMode(mode === 'login' ? 'signup' : 'login');
    // Limpa erros ao trocar de modo
    setErrors({});
  }

  /**
   * Auto-fill Demo
   * Preenche credenciais de demonstração
   */
  function fillDemoCredentials() {
    setEmail('daniel@example.com');
    setPassword('123456');
    if (mode === 'signup') {
      setName('Daniel Silva');
    }
  }

  // ============================================
  // RENDER
  // ============================================

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.icon}>🔐</Text>
          <Text style={styles.title}>
            {mode === 'login' ? 'Bem-vindo!' : 'Criar Conta'}
          </Text>
          <Text style={styles.subtitle}>
            {mode === 'login'
              ? 'Faça login para acessar o conteúdo'
              : 'Preencha os dados para se cadastrar'}
          </Text>
        </View>

        {/* Demo Info */}
        <TouchableOpacity
          style={styles.demoButton}
          onPress={fillDemoCredentials}
        >
          <Text style={styles.demoText}>
            💡 Toque aqui para preencher credenciais de demonstração
          </Text>
        </TouchableOpacity>

        {/* Form */}
        <View style={styles.form}>
          {/* Nome (apenas no cadastro) */}
          {mode === 'signup' && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nome</Text>
              <TextInput
                style={[styles.input, errors.name && styles.inputError]}
                placeholder="Digite seu nome"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                autoCorrect={false}
              />
              {errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}
            </View>
          )}

          {/* Email */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              placeholder="Digite seu email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
          </View>

          {/* Senha */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={[styles.input, errors.password && styles.inputError]}
              placeholder="Digite sua senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.submitButton, loading && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitButtonText}>
                {mode === 'login' ? 'Entrar' : 'Cadastrar'}
              </Text>
            )}
          </TouchableOpacity>

          {/* Toggle Mode */}
          <View style={styles.toggleContainer}>
            <Text style={styles.toggleText}>
              {mode === 'login'
                ? 'Não tem uma conta?'
                : 'Já tem uma conta?'}
            </Text>
            <TouchableOpacity onPress={toggleMode}>
              <Text style={styles.toggleLink}>
                {mode === 'login' ? 'Cadastre-se' : 'Faça login'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>ℹ️ Informações de Demonstração</Text>
          <Text style={styles.infoText}>
            <Text style={styles.infoBold}>Email:</Text> daniel@example.com
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.infoBold}>Senha:</Text> 123456
          </Text>
          <Text style={styles.infoNote}>
            Ou cadastre-se criando uma nova conta!
          </Text>
        </View>

        {/* Concepts */}
        <View style={styles.concepts}>
          <Text style={styles.conceptsTitle}>📚 Conceitos Demonstrados:</Text>
          <Text style={styles.conceptText}>
            • Formulário com validação{'\n'}
            • Context API (AuthContext){'\n'}
            • AsyncStorage (persistência){'\n'}
            • Estados de loading{'\n'}
            • Error handling{'\n'}
            • KeyboardAvoidingView{'\n'}
            • Navegação condicional{'\n'}
            • Alternância Login/Cadastro
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ============================================
// STYLES
// ============================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  icon: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  demoButton: {
    backgroundColor: '#fff3cd',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ffc107',
  },
  demoText: {
    color: '#856404',
    textAlign: 'center',
    fontSize: 14,
  },
  form: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  inputError: {
    borderColor: '#dc3545',
  },
  errorText: {
    color: '#dc3545',
    fontSize: 12,
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    gap: 4,
  },
  toggleText: {
    color: '#666',
    fontSize: 14,
  },
  toggleLink: {
    color: '#2196F3',
    fontSize: 14,
    fontWeight: '600',
  },
  infoSection: {
    backgroundColor: '#e3f2fd',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  infoBold: {
    fontWeight: 'bold',
  },
  infoNote: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 8,
  },
  concepts: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  conceptsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  conceptText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
});

/**
 * ====================================================================
 * 💡 MELHORIAS PARA PRODUÇÃO
 * ====================================================================
 * 
 * 1. VALIDAÇÃO MAIS ROBUSTA
 *    - Use react-hook-form ou formik
 *    - Validação com yup ou zod
 *    - Validação em tempo real
 * 
 * 2. UX IMPROVEMENTS
 *    - Mostrar/esconder senha (ícone de olho)
 *    - Esqueci minha senha
 *    - Confirmar senha no cadastro
 *    - Termos de uso e política de privacidade
 * 
 * 3. SEGURANÇA
 *    - Força da senha (barra de progresso)
 *    - CAPTCHA após N tentativas falhas
 *    - Rate limiting
 *    - Validação no backend também
 * 
 * 4. SOCIAL LOGIN
 *    - Login com Google
 *    - Login com Apple (obrigatório no iOS se houver social login)
 *    - Login com Facebook
 * 
 * 5. BIOMETRIA
 *    - Face ID / Touch ID
 *    - expo-local-authentication
 * 
 * 6. FEEDBACK VISUAL
 *    - Animações de sucesso/erro
 *    - Skeleton loading
 *    - Toast messages
 */
