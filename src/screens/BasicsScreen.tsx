/**
 * ====================================================================
 * 📱 BASICS SCREEN - Componentes Básicos do React Native
 * ====================================================================
 * 
 * COMPONENTES DEMONSTRADOS:
 * 
 * 1. View - Container básico (como <div>)
 * 2. Text - Exibição de texto (como <p>, <span>, <h1>)
 * 3. Image - Exibição de imagens (como <img>)
 * 4. ScrollView - Container com scroll
 * 5. TouchableOpacity - Botão com feedback de opacidade
 * 6. TouchableHighlight - Botão com feedback de cor
 * 7. Pressable - Componente de toque mais flexível (recomendado)
 * 8. SafeAreaView - Respeita áreas seguras do dispositivo (notch, etc)
 * 
 * IMPORTANTE: 
 * - Em React Native, TUDO é um componente
 * - Não existe HTML, apenas componentes React Native
 * - Text DEVE estar dentro de um componente Text (não pode estar solto na View)
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Pressable,
  StyleSheet,
  Alert,
  Platform, // Para verificar se é iOS ou Android
  Dimensions, // Para obter dimensões da tela
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Obtendo dimensões da tela
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function BasicsScreen() {
  // Estado para demonstrar interatividade
  const [pressCount, setPressCount] = useState(0);

  // Função para mostrar um Alert (equivalente a alert() na web)
  const showAlert = () => {
    Alert.alert(
      'Título do Alert', // Título
      'Esta é uma mensagem de alerta!', // Mensagem
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ============================================
            SEÇÃO 1: VIEW - O Container Básico
            ============================================ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📦 View - Container Básico</Text>
          <Text style={styles.description}>
            View é o componente mais fundamental. É como uma {'<div>'} na web.
            Usado para agrupar outros componentes e aplicar layout.
          </Text>
          
          {/* Exemplo de Views aninhadas */}
          <View style={styles.exampleBox}>
            <View style={styles.outerView}>
              <Text style={styles.viewText}>View Externa</Text>
              <View style={styles.innerView}>
                <Text style={styles.viewText}>View Interna</Text>
              </View>
            </View>
          </View>

          <View style={styles.codeBlock}>
            <Text style={styles.codeText}>
              {`<View style={styles.container}>
  <View style={styles.child}>
    <Text>Conteúdo</Text>
  </View>
</View>`}
            </Text>
          </View>
        </View>

        {/* ============================================
            SEÇÃO 2: TEXT - Exibição de Texto
            ============================================ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📝 Text - Exibição de Texto</Text>
          <Text style={styles.description}>
            Todo texto DEVE estar dentro de um componente Text.
            Diferente da web, você não pode colocar texto diretamente em uma View.
          </Text>

          <View style={styles.exampleBox}>
            <Text style={styles.textBold}>Texto em Negrito</Text>
            <Text style={styles.textItalic}>Texto em Itálico</Text>
            <Text style={styles.textUnderline}>Texto Sublinhado</Text>
            <Text style={styles.textColored}>Texto Colorido</Text>
            
            {/* Text aninhado - útil para estilos inline */}
            <Text style={styles.textNested}>
              Texto normal com{' '}
              <Text style={styles.textBold}>negrito</Text> e{' '}
              <Text style={styles.textColored}>colorido</Text> inline.
            </Text>
          </View>

          {/* Propriedades úteis do Text */}
          <View style={styles.exampleBox}>
            <Text 
              numberOfLines={2} // Limita número de linhas
              ellipsizeMode="tail" // Adiciona "..." no final
              style={styles.textNested}
            >
              Este texto é muito longo e será truncado após duas linhas. 
              Observe como o texto é cortado e aparece reticências no final.
              Esta é uma funcionalidade muito útil para listas e cards.
            </Text>

            <Text 
              selectable // Permite selecionar e copiar o texto
              style={[styles.textNested, { marginTop: 8 }]}
            >
              Este texto é selecionável. Tente pressionar e segurar!
            </Text>
          </View>
        </View>

        {/* ============================================
            SEÇÃO 3: IMAGE - Exibição de Imagens
            ============================================ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🖼️ Image - Exibição de Imagens</Text>
          <Text style={styles.description}>
            Usado para exibir imagens locais ou remotas (URL).
            Diferente da web, você DEVE especificar largura e altura.
          </Text>

          <View style={styles.exampleBox}>
            {/* Imagem de URL remota */}
            <Text style={styles.label}>Imagem Remota (URL):</Text>
            <Image
              source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
              style={styles.imageRemote}
              // resizeMode controla como a imagem se ajusta
              resizeMode="contain" // contain, cover, stretch, repeat, center
            />

            {/* Demonstração de resizeModes */}
            <Text style={[styles.label, { marginTop: 16 }]}>Modos de Resize:</Text>
            <View style={styles.resizeModeContainer}>
              {(['contain', 'cover', 'stretch'] as const).map((mode) => (
                <View key={mode} style={styles.resizeModeItem}>
                  <Image
                    source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
                    style={styles.resizeModeImage}
                    resizeMode={mode}
                  />
                  <Text style={styles.resizeModeLabel}>{mode}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.codeBlock}>
            <Text style={styles.codeText}>
              {`// Imagem remota (URL)
<Image
  source={{ uri: 'https://...' }}
  style={{ width: 100, height: 100 }}
  resizeMode="contain"
/>

// Imagem local (require)
<Image
  source={require('./assets/logo.png')}
  style={{ width: 100, height: 100 }}
/>`}
            </Text>
          </View>
        </View>

        {/* ============================================
            SEÇÃO 4: TOUCHABLES - Botões e Interação
            ============================================ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>👆 Touchables - Interação</Text>
          <Text style={styles.description}>
            Componentes para lidar com toques. TouchableOpacity é o mais comum.
            Pressable é o mais novo e recomendado para novos projetos.
          </Text>

          <View style={styles.exampleBox}>
            {/* TouchableOpacity - Fica transparente ao tocar */}
            <TouchableOpacity
              style={styles.buttonPrimary}
              onPress={() => setPressCount(prev => prev + 1)}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonText}>
                TouchableOpacity (Cliques: {pressCount})
              </Text>
            </TouchableOpacity>

            {/* TouchableHighlight - Muda cor de fundo ao tocar */}
            <TouchableHighlight
              style={styles.buttonSecondary}
              onPress={showAlert}
              underlayColor="#2980b9" // Cor quando pressionado
            >
              <Text style={styles.buttonText}>TouchableHighlight (Alert)</Text>
            </TouchableHighlight>

            {/* Pressable - Mais flexível e moderno */}
            <Pressable
              style={({ pressed }) => [
                styles.buttonTertiary,
                pressed && styles.buttonPressed, // Estilo quando pressionado
              ]}
              onPress={() => console.log('Pressed!')}
              onLongPress={() => Alert.alert('Long Press!')} // Evento de toque longo
            >
              {({ pressed }) => (
                <Text style={[styles.buttonText, pressed && { opacity: 0.8 }]}>
                  Pressable {pressed ? '(Pressionado!)' : '(Pressione)'}
                </Text>
              )}
            </Pressable>
          </View>

          <View style={styles.codeBlock}>
            <Text style={styles.codeText}>
              {`<TouchableOpacity
  onPress={() => doSomething()}
  activeOpacity={0.7}
>
  <Text>Clique Aqui</Text>
</TouchableOpacity>

<Pressable
  style={({ pressed }) => [
    styles.button,
    pressed && styles.pressed
  ]}
  onPress={handlePress}
  onLongPress={handleLongPress}
>
  <Text>Pressione</Text>
</Pressable>`}
            </Text>
          </View>
        </View>

        {/* ============================================
            SEÇÃO 5: PLATFORM - Verificação de Plataforma
            ============================================ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📱 Platform - iOS vs Android</Text>
          <Text style={styles.description}>
            Use Platform.OS para verificar a plataforma atual e aplicar
            estilos ou comportamentos específicos.
          </Text>

          <View style={styles.exampleBox}>
            <Text style={styles.platformText}>
              Você está em: {Platform.OS === 'ios' ? '🍎 iOS' : '🤖 Android'}
            </Text>
            <Text style={styles.platformText}>
              Versão: {Platform.Version}
            </Text>
            <Text style={styles.platformText}>
              Largura da tela: {SCREEN_WIDTH.toFixed(0)}px
            </Text>
            <Text style={styles.platformText}>
              Altura da tela: {SCREEN_HEIGHT.toFixed(0)}px
            </Text>
          </View>

          <View style={styles.codeBlock}>
            <Text style={styles.codeText}>
              {`import { Platform } from 'react-native';

// Verificação simples
if (Platform.OS === 'ios') {
  // Código específico iOS
}

// Seleção de valor
const padding = Platform.select({
  ios: 20,
  android: 16,
  default: 12,
});`}
            </Text>
          </View>
        </View>

        {/* Espaço extra no final */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
    marginBottom: 16,
  },
  exampleBox: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  codeBlock: {
    backgroundColor: '#2c3e50',
    borderRadius: 8,
    padding: 12,
  },
  codeText: {
    fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace' }),
    fontSize: 11,
    color: '#ecf0f1',
    lineHeight: 18,
  },
  // View examples
  outerView: {
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  innerView: {
    backgroundColor: '#2ecc71',
    padding: 12,
    borderRadius: 6,
    marginTop: 8,
  },
  viewText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  // Text examples
  textBold: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  textItalic: {
    fontStyle: 'italic',
    fontSize: 14,
    marginBottom: 4,
  },
  textUnderline: {
    textDecorationLine: 'underline',
    fontSize: 14,
    marginBottom: 4,
  },
  textColored: {
    color: '#e74c3c',
    fontSize: 14,
    marginBottom: 4,
  },
  textNested: {
    fontSize: 14,
    color: '#2c3e50',
    lineHeight: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#7f8c8d',
    marginBottom: 8,
  },
  // Image examples
  imageRemote: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  resizeModeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  resizeModeItem: {
    alignItems: 'center',
  },
  resizeModeImage: {
    width: 60,
    height: 60,
    backgroundColor: '#ecf0f1',
    borderWidth: 1,
    borderColor: '#bdc3c7',
  },
  resizeModeLabel: {
    fontSize: 11,
    color: '#7f8c8d',
    marginTop: 4,
  },
  // Button examples
  buttonPrimary: {
    backgroundColor: '#3498db',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonSecondary: {
    backgroundColor: '#2ecc71',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonTertiary: {
    backgroundColor: '#9b59b6',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonPressed: {
    backgroundColor: '#8e44ad',
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  // Platform examples
  platformText: {
    fontSize: 14,
    color: '#2c3e50',
    marginBottom: 4,
  },
});
