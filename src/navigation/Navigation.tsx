/**
 * ====================================================================
 * 🧭 NAVIGATION - Configuração do React Navigation
 * ====================================================================
 * 
 * CONCEITOS DEMONSTRADOS:
 * 
 * 1. NavigationContainer - Container principal da navegação
 * 2. Stack Navigator - Navegação em pilha (push/pop)
 * 3. Tab Navigator - Navegação por abas (bottom tabs)
 * 4. Nested Navigation - Navegação aninhada (Stack dentro de Tab)
 * 5. Configuração de headers
 * 6. Tipagem TypeScript para navegação
 * 
 * TIPOS DE NAVEGAÇÃO:
 * - Stack: Empilha telas (mais comum)
 * - Tab: Abas na parte inferior/superior
 * - Drawer: Menu lateral
 * - Podem ser aninhadas (ex: Tab dentro de Stack)
 * 
 * ESTRUTURA ATUAL:
NavigationContainer
├── Stack Navigator (Root)
│   │
│   ├── [NÃO AUTENTICADO]
│   │   └── Auth (AuthScreen)
│   │
│   └── [AUTENTICADO]
│       ├── Home (TabNavigator)
│       │   ├── Tab: Aprenda (HomeScreen)
│       │   └── Tab: Extras (ExtrasStack) ← NESTED NAVIGATION
│       │       ├── ExtrasHome (ExtrasHomeScreen)
│       │       ├── Profile (ProfileScreen)
│       │       └── Settings (SettingsScreen)
│       │
│       ├── Basics (BasicsScreen)
│       ├── Styling (StylingScreen)
│       ├── Lists (ListsScreen)
│       ├── Forms (FormsScreen)
│       ├── API (APIScreen)
│       ├── Storage (StorageScreen)
│       ├── Hooks (HooksScreen)
│       ├── Modal (ModalScreen)
│       ├── Theme (ThemeScreen)
│       └── Protected (ProtectedScreen)
 */

import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useAuth } from '../contexts/AuthContext';

// Tab Navigator
import TabNavigator from './TabNavigator';

// Telas de Autenticação
import AuthScreen from '../screens/AuthScreen';

// Telas protegidas
import BasicsScreen from '../screens/BasicsScreen';
import StylingScreen from '../screens/StylingScreen';
import ListsScreen from '../screens/ListsScreen';
import FormsScreen from '../screens/FormsScreen';
import APIScreen from '../screens/APIScreen';
import StorageScreen from '../screens/StorageScreen';
import HooksScreen from '../screens/HooksScreen';
import ModalScreen from '../screens/ModalScreen';
import ThemeScreen from '../screens/ThemeScreen';
import ProtectedScreen from '../screens/ProtectedScreen';

// Criando o Stack Navigator com tipagem
const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Componente principal de navegação
 * 
 * NavigationContainer: 
 * - Deve envolver toda a árvore de navegação
 * - Gerencia o estado da navegação
 * - Deve estar apenas uma vez no app (geralmente no App.tsx)
 * 
 * NAVEGAÇÃO CONDICIONAL (Protected Routes):
 * -----------------------------------------
 * - Se NÃO autenticado → Mostra tela de Auth (Login/Cadastro)
 * - Se autenticado → Mostra Tab Navigator + todas as telas de conteúdo
 * - Loading → Mostra spinner enquanto verifica sessão no AsyncStorage
 * 
 * A proteção é feita renderizando diferentes stacks baseado em isAuthenticated.
 * Usuários não autenticados NUNCA verão as telas protegidas no navigator.
 */
export default function Navigation() {
  // Hook de autenticação
  const { isAuthenticated, loading } = useAuth();

  // Loading Screen enquanto verifica sessão salva
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          // Configurações globais para todas as telas
          headerStyle: {
            backgroundColor: '#3498db',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          animation: 'slide_from_right',
          gestureEnabled: true,
        }}
      >
        {/* ================================================
            NAVEGAÇÃO CONDICIONAL (PROTEÇÃO DE ROTAS)
            ================================================ */}
        
        {!isAuthenticated ? (
          /* ============================================
             NÃO AUTENTICADO - Apenas tela de login
             ============================================ */
          <Stack.Screen
            name="Auth"
            component={AuthScreen}
            options={{
              headerShown: false,
              gestureEnabled: false, // Não permite voltar
            }}
          />
        ) : (
          /* ============================================
             AUTENTICADO - Todas as telas do app
             ============================================ */
          <>
            {/* Tab Navigator - Home */}
            <Stack.Screen
              name="Home"
              component={TabNavigator}
              options={{
                headerShown: false,
              }}
            />

            {/* Telas de Conteúdo */}
            <Stack.Screen
              name="Basics"
              component={BasicsScreen}
              options={{
                title: '📱 Componentes Básicos',
                headerBackTitle: 'Voltar',
              }}
            />

            <Stack.Screen
              name="Styling"
              component={StylingScreen}
              options={{
                title: '🎨 Estilização',
              }}
            />

            <Stack.Screen
              name="Lists"
              component={ListsScreen}
              options={{
                title: '📋 Listas',
              }}
            />

            <Stack.Screen
              name="Forms"
              component={FormsScreen}
              options={{
                title: '📝 Formulários',
              }}
            />

            <Stack.Screen
              name="API"
              component={APIScreen}
              options={{
                title: '🌐 Integração API',
              }}
            />

            <Stack.Screen
              name="Storage"
              component={StorageScreen}
              options={{
                title: '💾 Armazenamento',
              }}
            />

            <Stack.Screen
              name="Hooks"
              component={HooksScreen}
              options={{
                title: '🪝 Hooks',
              }}
            />

            <Stack.Screen
              name="Modal"
              component={ModalScreen}
              options={{
                title: '🔲 Modais',
              }}
            />

            <Stack.Screen
              name="Theme"
              component={ThemeScreen}
              options={{
                title: '🎨 Context API & Temas',
              }}
            />

            {/* Tela Protegida - Exemplo */}
            <Stack.Screen
              name="Protected"
              component={ProtectedScreen}
              options={{
                title: '🛡️ Área Protegida',
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Estilos do loading
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});

/**
 * DICAS DE NAVEGAÇÃO:
 * 
 * 1. Navegar para uma tela:
 *    navigation.navigate('NomeDaTela');
 *    navigation.navigate('NomeDaTela', { param1: 'valor' });
 * 
 * 2. Voltar:
 *    navigation.goBack();
 * 
 * 3. Resetar stack (útil após login):
 *    navigation.reset({
 *      index: 0,
 *      routes: [{ name: 'Home' }],
 *    });
 * 
 * 4. Substituir tela atual:
 *    navigation.replace('NovaTela');
 * 
 * 5. Passar parâmetros:
 *    // Enviar
 *    navigation.navigate('Detalhes', { id: 123 });
 *    
 *    // Receber
 *    const { id } = route.params;
 * 
 * 6. Hook de navegação:
 *    import { useNavigation, useRoute } from '@react-navigation/native';
 *    const navigation = useNavigation();
 *    const route = useRoute();
 */
