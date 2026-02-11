/**
 * ====================================================================
 * 📚 TYPES - Definição de tipos TypeScript
 * ====================================================================
 * 
 * CONCEITO: TypeScript no React Native
 * - React Native suporta TypeScript nativamente com Expo
 * - Tipagem ajuda a evitar erros e melhora a experiência de desenvolvimento
 * - Defina seus tipos em arquivos separados para melhor organização
 */

// Tipo para representar um usuário
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string; // O "?" indica que é opcional
}

// Tipo para um item de lista genérico
export interface ListItem {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl?: string;
}

// Tipo para dados de um post (usado na demonstração de API)
export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

// Tipo para dados de formulário
export interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Tipo para erros de validação de formulário
export interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

// Tipo para itens armazenados no AsyncStorage
export interface StoredItem {
  id: string;
  text: string;
  createdAt: string;
}

// Tipo para navegação - será expandido conforme necessário
export type RootStackParamList = {
  Home: undefined;
  Basics: undefined;
  Styling: undefined;
  Lists: undefined;
  Forms: undefined;
  API: undefined;
  Storage: undefined;
  Hooks: undefined;
  Modal: undefined;
  Theme: undefined;
  Auth: undefined;
  Protected: undefined;
};

// Tipo para as tabs
export type TabParamList = {
  LearnTab: undefined;
  ExtrasTab: undefined;
};
