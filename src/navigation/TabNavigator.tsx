/**
 * TAB NAVIGATOR
 * ============================================
 * Componente de navegação por abas (tabs) do aplicativo
 * 
 * CONCEITOS IMPORTANTES:
 * - React Navigation Bottom Tabs: Navegação por abas na parte inferior
 * - Nested Navigation: Stack navigators dentro de cada aba
 * - Icons: Usando emojis para ícones simples (em produção use expo-vector-icons ou react-native-vector-icons)
 * - Tab Bar Customization: Personalização da aparência das abas
 */

import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { TabParamList, ExtrasStackParamList } from '../types';
import { 
  HomeScreen, 
  ExtrasHomeScreen, 
  ProfileScreen, 
  SettingsScreen 
} from '../screens';

// Criação do Bottom Tab Navigator
// Isso cria um componente que renderiza abas na parte inferior da tela
const Tab = createBottomTabNavigator<TabParamList>();

// Criação do Stack Navigator para a aba Extras
// Nested navigation: Stack dentro de Tab
const ExtrasStack = createNativeStackNavigator<ExtrasStackParamList>();

/**
 * ExtrasStackNavigator Component
 * -------------------------------
 * Stack Navigator aninhado dentro da aba Extras
 * 
 * CONCEITO: NESTED NAVIGATION
 * - Uma aba pode ter seu próprio Stack Navigator
 * - Permite navegação entre telas dentro da aba
 * - Mantém o histórico de navegação independente
 * 
 * ESTRUTURA:
 * - ExtrasHome: Menu principal da aba Extras
 * - Profile: Perfil do usuário
 * - Settings: Configurações do app
 */
function ExtrasStackNavigator() {
  return (
    <ExtrasStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2196F3',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <ExtrasStack.Screen 
        name="ExtrasHome" 
        component={ExtrasHomeScreen}
        options={{ title: 'Extras' }}
      />
      <ExtrasStack.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ title: 'Meu Perfil' }}
      />
      <ExtrasStack.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{ title: 'Configurações' }}
      />
    </ExtrasStack.Navigator>
  );
}

/**
 * TabNavigator Component
 * ----------------------
 * Organiza as telas em abas para melhor navegação
 * 
 * ESTRUTURA:
 * - Aba "Aprenda": Tela inicial com todos os módulos de aprendizado
 * - Aba "Extras": Recursos adicionais (API, Storage, Hooks, Modal, Theme)
 * 
 * RECURSOS UTILIZADOS:
 * - screenOptions: Configurações globais para todas as abas
 *   - headerShown: Mostrar/ocultar o cabeçalho
 *   - tabBarActiveTintColor: Cor do ícone/texto quando aba está ativa
 *   - tabBarInactiveTintColor: Cor do ícone/texto quando aba está inativa
 *   - tabBarStyle: Estilos personalizados da barra de abas
 * 
 * - options (por screen): Configurações específicas de cada aba
 *   - tabBarIcon: Função que retorna o ícone da aba
 *   - tabBarLabel: Texto exibido abaixo do ícone
 */
export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        // Remove o header de cada tela (já temos headers nas telas individuais)
        headerShown: false,
        
        // Cor do ícone e texto quando a aba está ativa (selecionada)
        tabBarActiveTintColor: '#2196F3',
        
        // Cor do ícone e texto quando a aba está inativa
        tabBarInactiveTintColor: '#757575',
        
        // Estilos personalizados da barra de abas
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        
        // Estilos do label (texto)
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      {/* 
        ABA PRINCIPAL: Aprenda
        ----------------------
        Contém a HomeScreen com todos os módulos de aprendizado
      */}
      <Tab.Screen 
        name="LearnTab" 
        component={HomeScreen}
        options={{
          // Ícone da aba - usando Text com emoji
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 24, color }}>📚</Text>
          ),
          // Label exibido abaixo do ícone
          tabBarLabel: 'Aprenda',
        }}
      />

      {/* 
        ABA SECUNDÁRIA: Extras
        ----------------------
        Contém um Stack Navigator com:
        - ExtrasHome: Menu de opções
        - Profile: Perfil do usuário
        - Settings: Configurações do app
        
        NESTED NAVIGATION:
        Esta é uma demonstração de navegação aninhada (Stack dentro de Tab)
        Cada aba pode ter seu próprio navegador interno
      */}
      <Tab.Screen 
        name="ExtrasTab" 
        component={ExtrasStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 24, color }}>⭐</Text>
          ),
          tabBarLabel: 'Extras',
          // Remove header da Tab porque ExtrasStack já tem header próprio
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

/**
 * NOTAS IMPORTANTES SOBRE TAB NAVIGATION:
 * =========================================
 * 
 * 1. NESTED NAVIGATION (Navegação Aninhada)
 *    - É comum ter Stack Navigators dentro de cada aba
 *    - Exemplo: Aba "Home" com Stack de HomeScreen -> DetailsScreen
 *    - Cada aba mantém seu próprio histórico de navegação
 * 
 * 2. ÍCONES
 *    - Em produção, use bibliotecas como:
 *      * @expo/vector-icons (para Expo)
 *      * react-native-vector-icons (para React Native CLI)
 *    - Evite usar emojis em produção (podem não funcionar em todos os dispositivos)
 * 
 * 3. CUSTOMIZAÇÃO
 *    - tabBarActiveTintColor: Cor quando aba está ativa
 *    - tabBarInactiveTintColor: Cor quando aba está inativa
 *    - tabBarStyle: Estilos personalizados da barra
 *    - tabBarIcon: Componente de ícone personalizado
 *    - tabBarBadge: Badge de notificação (ex: número de mensagens não lidas)
 * 
 * 4. NAVEGAÇÃO ENTRE ABAS
 *    - navigation.navigate('LearnTab'): Vai para a aba Learn
 *    - navigation.navigate('ExtrasTab'): Vai para a aba Extras
 *    - Abas mantêm estado ao trocar entre elas
 * 
 * 5. BOAS PRÁTICAS
 *    - Máximo de 5 abas (3-4 é ideal)
 *    - Ícones claros e intuitivos
 *    - Labels curtos e descritivos
 *    - Cores consistentes com o design do app
 * 
 * 6. PERFORMANCE
 *    - Abas são lazy loaded por padrão
 *    - Use `lazy: false` para pré-carregar todas as abas
 *    - Evite animações pesadas nas abas
 * 
 * 7. ACESSIBILIDADE
 *    - Sempre forneça labels descritivos
 *    - Use cores com bom contraste
 *    - Ícones devem ser facilmente distinguíveis
 * 
 * EXEMPLO DE USO AVANÇADO:
 * ------------------------
 * 
 * <Tab.Screen 
 *   name="Home" 
 *   component={HomeStackNavigator} // Stack Navigator aninhado
 *   options={{
 *     tabBarIcon: ({ focused, color, size }) => (
 *       <Ionicons 
 *         name={focused ? 'home' : 'home-outline'} 
 *         size={size} 
 *         color={color} 
 *       />
 *     ),
 *     tabBarBadge: 3, // Badge de notificação
 *     tabBarBadgeStyle: { backgroundColor: '#FF0000' },
 *   }}
 * />
 */
