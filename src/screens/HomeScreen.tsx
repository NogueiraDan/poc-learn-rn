/**
 * ====================================================================
 * 🏠 HOME SCREEN - Tela Principal
 * ====================================================================
 * 
 * CONCEITOS DEMONSTRADOS:
 * - View: Container principal (equivalente a <div> na web)
 * - Text: Componente para textos (equivalente a <p>, <span>, etc.)
 * - ScrollView: Container com scroll (para conteúdo que excede a tela)
 * - TouchableOpacity: Botão com feedback de opacidade
 * - StyleSheet: Sistema de estilização do React Native
 * 
 * DIFERENÇAS DO REACT WEB:
 * - Não existe HTML, tudo são componentes nativos
 * - Não existe CSS, usamos StyleSheet ou objetos de estilo
 * - Flexbox é o padrão (flexDirection: 'column' por padrão)
 */

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

// Tipagem para navegação - boa prática em TypeScript
type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

// Lista de módulos de aprendizado
const learningModules = [
  {
    id: 'basics',
    title: '📱 Componentes Básicos',
    description: 'View, Text, Image, ScrollView, TouchableOpacity',
    route: 'Basics' as const,
    color: '#3498db',
  },
  {
    id: 'styling',
    title: '🎨 Estilização',
    description: 'StyleSheet, Flexbox, Dimensões',
    route: 'Styling' as const,
    color: '#9b59b6',
  },
  {
    id: 'lists',
    title: '📋 Listas & Performance',
    description: 'FlatList, SectionList, Otimização',
    route: 'Lists' as const,
    color: '#2ecc71',
  },
  {
    id: 'forms',
    title: '📝 Formulários',
    description: 'TextInput, Validação, Keyboard',
    route: 'Forms' as const,
    color: '#e74c3c',
  },
  {
    id: 'api',
    title: '🌐 Integração API',
    description: 'Fetch, Loading States, Error Handling',
    route: 'API' as const,
    color: '#f39c12',
  },
  {
    id: 'storage',
    title: '💾 Armazenamento',
    description: 'AsyncStorage, Persistência de Dados',
    route: 'Storage' as const,
    color: '#1abc9c',
  },
  {
    id: 'hooks',
    title: '🪝 Hooks Essenciais',
    description: 'useState, useEffect, useCallback, useMemo',
    route: 'Hooks' as const,
    color: '#e91e63',
  },
  {
    id: 'modal',
    title: '🔲 Modais',
    description: 'Modal, Bottom Sheet, Overlays',
    route: 'Modal' as const,
    color: '#34495e',
  },
  {
    id: 'theme',
    title: '🎨 Context API & Temas',
    description: 'Context, Theme Toggle, Imagens Locais',
    route: 'Theme' as const,
    color: '#95a5a6',
  },
  {
    id: 'protected',
    title: '🛡️ Autenticação & Autorização',
    description: 'Proteção de Rotas, Login, Roles',
    route: 'Protected' as const,
    color: '#16a085',
  },
];

export default function HomeScreen() {
  // Hook de navegação - usamos para navegar entre telas
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      {/* 
        StatusBar: Controla a aparência da barra de status do dispositivo
        - style="auto" ajusta automaticamente baseado no tema
        - Pode ser "light" (texto branco) ou "dark" (texto preto)
      */}
      <StatusBar style="auto" />

      {/* 
        ScrollView: Permite scroll quando o conteúdo excede a tela
        - showsVerticalScrollIndicator: mostra/esconde a barra de scroll
        - contentContainerStyle: estilo do container interno
      */}
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Bem-vindo ao</Text>
          <Text style={styles.title}>React Native Learning Hub</Text>
          <Text style={styles.subtitle}>
            Aprenda os conceitos essenciais de React Native com exemplos práticos
          </Text>
        </View>

        {/* Info Box - Dica para iniciantes */}
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>💡 Dica</Text>
          <Text style={styles.infoText}>
            Cada módulo contém exemplos de código comentados. 
            Explore o código-fonte para entender como tudo funciona!
          </Text>
        </View>

        {/* Lista de Módulos */}
        <Text style={styles.sectionTitle}>Módulos de Aprendizado</Text>
        
        {learningModules.map((module) => (
          <TouchableOpacity
            key={module.id}
            style={[styles.moduleCard, { borderLeftColor: module.color }]}
            onPress={() => navigation.navigate(module.route)}
            // activeOpacity: opacidade quando pressionado (0-1)
            activeOpacity={0.7}
          >
            <Text style={styles.moduleTitle}>{module.title}</Text>
            <Text style={styles.moduleDescription}>{module.description}</Text>
          </TouchableOpacity>
        ))}

        {/* Footer com informações */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            📚 POC React Native - Versão 1.0
          </Text>
          <Text style={styles.footerSubtext}>
            Feito com Expo SDK 54
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

/**
 * StyleSheet.create - Sistema de Estilização do React Native
 * 
 * DIFERENÇAS DO CSS WEB:
 * - Propriedades em camelCase (backgroundColor ao invés de background-color)
 * - Valores numéricos sem unidade (significa pixels)
 * - Flexbox como padrão (flexDirection: 'column' por padrão - diferente da web!)
 * - Não existe herança de estilos (cada componente precisa seu próprio estilo)
 * - Não existe cascata de estilos
 */
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa todo o espaço disponível
    backgroundColor: '#f5f6fa',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40, // Espaço extra no final para scroll
  },
  header: {
    marginBottom: 24,
    alignItems: 'center', // Centraliza horizontalmente (pois flexDirection é column)
  },
  welcomeText: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 20, // Espaçamento entre linhas
  },
  infoBox: {
    backgroundColor: '#e8f4f8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#3498db',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2980b9',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
  },
  moduleCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    // Sombra no iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Sombra no Android
    elevation: 3,
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  moduleDescription: {
    fontSize: 13,
    color: '#7f8c8d',
  },
  footer: {
    marginTop: 24,
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
  },
  footerText: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  footerSubtext: {
    fontSize: 12,
    color: '#95a5a6',
    marginTop: 4,
  },
});
