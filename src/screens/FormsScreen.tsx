/**
 * ====================================================================
 * 📝 FORMS SCREEN - Formulários em React Native
 * ====================================================================
 * 
 * CONCEITOS DEMONSTRADOS:
 * 
 * 1. TextInput - Campo de entrada de texto
 * 2. Keyboard Handling - Evitando que o teclado cubra inputs
 * 3. Validação de Formulário
 * 4. Diferentes tipos de teclado (email, número, senha)
 * 5. Refs e foco programático
 * 6. KeyboardAvoidingView
 * 
 * DIFERENÇAS DO REACT WEB:
 * - Não existe <input type="..."> - usamos props no TextInput
 * - O teclado pode cobrir inputs - precisamos de KeyboardAvoidingView
 * - Eventos são onChangeText ao invés de onChange
 */

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormData, FormErrors } from '../types';

export default function FormsScreen() {
  // ============================================
  // ESTADO DO FORMULÁRIO
  // ============================================
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ============================================
  // REFS PARA INPUTS - Permite focar programaticamente
  // ============================================
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  // ============================================
  // VALIDAÇÃO
  // ============================================
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validar nome
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Nome deve ter pelo menos 3 caracteres';
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    // Validar senha
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }

    // Validar confirmação de senha
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirme sua senha';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Senhas não conferem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ============================================
  // HANDLER DE MUDANÇA DE INPUT
  // ============================================
  const handleChange = (field: keyof FormData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Limpa erro do campo quando usuário começa a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // ============================================
  // SUBMIT DO FORMULÁRIO
  // ============================================
  const handleSubmit = async () => {
    // Fecha o teclado
    Keyboard.dismiss();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simula envio para API
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        'Sucesso! 🎉',
        `Cadastro realizado com sucesso!\n\nNome: ${formData.name}\nEmail: ${formData.email}`,
        [{ text: 'OK', onPress: () => resetForm() }]
      );
    }, 1500);
  };

  // ============================================
  // RESET DO FORMULÁRIO
  // ============================================
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    setErrors({});
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {/* 
        KeyboardAvoidingView: Ajusta a tela quando o teclado abre
        - behavior: 'padding' funciona melhor no iOS
        - behavior: 'height' funciona melhor no Android
        - Pode usar Platform.OS para escolher
      */}
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        {/* 
          TouchableWithoutFeedback: Permite fechar o teclado 
          ao tocar fora dos inputs
        */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled" // Importante para botões funcionarem com teclado aberto
          >
            {/* Header Info */}
            <View style={styles.header}>
              <Text style={styles.title}>📝 Formulário de Cadastro</Text>
              <Text style={styles.subtitle}>
                Demonstração de TextInput, validação e keyboard handling
              </Text>
            </View>

            {/* Formulário */}
            <View style={styles.form}>
              {/* ============================================
                  CAMPO: NOME
                  ============================================ */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nome Completo</Text>
                <TextInput
                  style={[styles.input, errors.name && styles.inputError]}
                  placeholder="Digite seu nome"
                  placeholderTextColor="#95a5a6"
                  value={formData.name}
                  onChangeText={handleChange('name')}
                  
                  // Configurações de teclado e autocomplete
                  autoCapitalize="words" // Capitaliza palavras
                  autoCorrect={false}
                  autoComplete="name" // Sugere nomes salvos
                  
                  // Navegação entre inputs
                  returnKeyType="next" // Mostra "Next" no teclado
                  onSubmitEditing={() => emailRef.current?.focus()}
                  blurOnSubmit={false} // Não perde foco ao pressionar enter
                />
                {errors.name && (
                  <Text style={styles.errorText}>{errors.name}</Text>
                )}
              </View>

              {/* ============================================
                  CAMPO: EMAIL
                  ============================================ */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  ref={emailRef}
                  style={[styles.input, errors.email && styles.inputError]}
                  placeholder="Digite seu email"
                  placeholderTextColor="#95a5a6"
                  value={formData.email}
                  onChangeText={handleChange('email')}
                  
                  // Tipo de teclado para email
                  keyboardType="email-address"
                  autoCapitalize="none" // Não capitaliza
                  autoCorrect={false}
                  autoComplete="email"
                  
                  returnKeyType="next"
                  onSubmitEditing={() => passwordRef.current?.focus()}
                  blurOnSubmit={false}
                />
                {errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>

              {/* ============================================
                  CAMPO: SENHA
                  ============================================ */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Senha</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    ref={passwordRef}
                    style={[
                      styles.input, 
                      styles.passwordInput,
                      errors.password && styles.inputError
                    ]}
                    placeholder="Digite sua senha"
                    placeholderTextColor="#95a5a6"
                    value={formData.password}
                    onChangeText={handleChange('password')}
                    
                    // Campo de senha
                    secureTextEntry={!showPassword} // Esconde caracteres
                    autoCapitalize="none"
                    autoComplete="password-new"
                    
                    returnKeyType="next"
                    onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                    blurOnSubmit={false}
                  />
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Text style={styles.eyeIcon}>
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </Text>
                  </TouchableOpacity>
                </View>
                {errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>

              {/* ============================================
                  CAMPO: CONFIRMAR SENHA
                  ============================================ */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Confirmar Senha</Text>
                <TextInput
                  ref={confirmPasswordRef}
                  style={[styles.input, errors.confirmPassword && styles.inputError]}
                  placeholder="Confirme sua senha"
                  placeholderTextColor="#95a5a6"
                  value={formData.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoComplete="password-new"
                  
                  returnKeyType="done" // Mostra "Done" no teclado
                  onSubmitEditing={handleSubmit} // Submit ao pressionar done
                />
                {errors.confirmPassword && (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                )}
              </View>

              {/* Botões */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[
                    styles.submitButton,
                    isSubmitting && styles.submitButtonDisabled
                  ]}
                  onPress={handleSubmit}
                  disabled={isSubmitting}
                  activeOpacity={0.8}
                >
                  <Text style={styles.submitButtonText}>
                    {isSubmitting ? 'Enviando...' : 'Cadastrar'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.resetButton}
                  onPress={resetForm}
                  activeOpacity={0.7}
                >
                  <Text style={styles.resetButtonText}>Limpar Formulário</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Tipos de Teclado */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>⌨️ Tipos de Teclado (keyboardType)</Text>
              
              <View style={styles.keyboardExamples}>
                {([
                  { type: 'default', label: 'Texto' },
                  { type: 'email-address', label: 'Email' },
                  { type: 'numeric', label: 'Números' },
                  { type: 'phone-pad', label: 'Telefone' },
                ] as const).map((item) => (
                  <View key={item.type} style={styles.keyboardExample}>
                    <Text style={styles.keyboardLabel}>{item.label}</Text>
                    <TextInput
                      style={styles.keyboardInput}
                      placeholder={item.type}
                      placeholderTextColor="#95a5a6"
                      keyboardType={item.type}
                    />
                  </View>
                ))}
              </View>
            </View>

            {/* Code Examples */}
            <View style={styles.codeBlock}>
              <Text style={styles.codeTitle}>💻 Props Importantes do TextInput</Text>
              <Text style={styles.codeText}>
                {`<TextInput
  value={value}
  onChangeText={setValue}
  
  // Tipos de teclado
  keyboardType="email-address"
  
  // Campo de senha
  secureTextEntry={true}
  
  // Capitalização
  autoCapitalize="none|words|sentences"
  
  // Navegação entre inputs
  returnKeyType="next|done|go|send"
  onSubmitEditing={() => nextInput.current?.focus()}
  blurOnSubmit={false}
  
  // Autocomplete (ajuda o teclado)
  autoComplete="email|password|name"
  
  // Multiline (textarea)
  multiline={true}
  numberOfLines={4}
/>`}
              </Text>
            </View>

            {/* Espaço extra */}
            <View style={{ height: 40 }} />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  form: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#2c3e50',
  },
  inputError: {
    borderColor: '#e74c3c',
    backgroundColor: '#fff5f5',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    paddingRight: 50,
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
    padding: 8,
  },
  eyeIcon: {
    fontSize: 20,
  },
  buttonContainer: {
    marginTop: 8,
    gap: 12,
  },
  submitButton: {
    backgroundColor: '#3498db',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#95a5a6',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#bdc3c7',
  },
  resetButtonText: {
    color: '#7f8c8d',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
  },
  keyboardExamples: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  keyboardExample: {
    width: '47%',
  },
  keyboardLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7f8c8d',
    marginBottom: 4,
  },
  keyboardInput: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#2c3e50',
  },
  codeBlock: {
    backgroundColor: '#2c3e50',
    borderRadius: 12,
    padding: 16,
  },
  codeTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#f1c40f',
    marginBottom: 12,
  },
  codeText: {
    fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace' }),
    fontSize: 11,
    color: '#ecf0f1',
    lineHeight: 18,
  },
});
