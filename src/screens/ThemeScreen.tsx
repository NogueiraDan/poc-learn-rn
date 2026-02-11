/**
 * ====================================================================
 * 🌓 THEME SCREEN - Context API e Imagens Locais
 * ====================================================================
 * 
 * CONCEITOS DEMONSTRADOS:
 * 
 * 1. Context API - Acessar estado global com useTheme()
 * 2. Imagens locais - require() vs URI
 * 3. Styled based on context
 * 
 * IMPORTANTE:
 * - Imagens locais: require('./path') - incluídas no bundle
 * - Imagens remotas: { uri: 'https://...' } - baixadas em runtime
 * - Imagens locais NÃO precisam de width/height explícito (mas recomendado)
 */

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../contexts';

export default function ThemeScreen() {
  // ============================================
  // ACESSANDO O CONTEXT
  // ============================================
  const { theme, colors, toggleTheme } = useTheme();
  
  const isDark = theme === 'dark';

  return (
    <SafeAreaView 
      style={[styles.container, { backgroundColor: colors.background }]} 
      edges={['bottom']}
    >
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ============================================
            SEÇÃO 1: CONTEXT API
            ============================================ */}
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            🌓 Context API - Tema Global
          </Text>
          <Text style={[styles.description, { color: colors.textSecondary }]}>
            Estado compartilhado entre componentes usando Context API.
            Este tema está disponível em toda a aplicação!
          </Text>

          {/* Toggle de Tema */}
          <View style={styles.themeToggle}>
            <View style={styles.themeInfo}>
              <Text style={[styles.themeLabel, { color: colors.text }]}>
                {isDark ? '🌙' : '☀️'} Modo {isDark ? 'Escuro' : 'Claro'}
              </Text>
              <Text style={[styles.themeSubtext, { color: colors.textSecondary }]}>
                Alterna entre temas claro e escuro
              </Text>
            </View>
            
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: '#e0e0e0', true: colors.primary }}
              thumbColor={isDark ? '#ffffff' : '#f4f3f4'}
            />
          </View>

          {/* Paleta de Cores */}
          <View style={styles.colorPalette}>
            <Text style={[styles.paletteTitle, { color: colors.text }]}>
              🎨 Paleta de Cores Atual
            </Text>
            
            <View style={styles.colorGrid}>
              {Object.entries(colors).map(([name, color]) => (
                <View key={name} style={styles.colorItem}>
                  <View 
                    style={[
                      styles.colorBox, 
                      { backgroundColor: color },
                      name === 'background' && styles.colorBoxBorder
                    ]} 
                  />
                  <Text style={[styles.colorName, { color: colors.textSecondary }]}>
                    {name}
                  </Text>
                  <Text style={[styles.colorValue, { color: colors.textSecondary }]}>
                    {color}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Código de Uso */}
          <View style={styles.codeBlock}>
            <Text style={styles.codeTitle}>💻 Como Usar</Text>
            <Text style={styles.codeText}>
              {`// 1. Importar o hook
import { useTheme } from '../contexts';

// 2. Usar no componente
function MyComponent() {
  const { theme, colors, toggleTheme } = useTheme();
  
  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.text }}>
        Tema atual: {theme}
      </Text>
      <Button onPress={toggleTheme} />
    </View>
  );
}`}
            </Text>
          </View>
        </View>

        {/* ============================================
            SEÇÃO 2: IMAGENS LOCAIS vs REMOTAS
            ============================================ */}
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            🖼️ Imagens - Local vs Remota
          </Text>
          <Text style={[styles.description, { color: colors.textSecondary }]}>
            Diferença entre imagens locais (require) e remotas (URI).
          </Text>

          {/* Imagem Local */}
          <View style={styles.imageExample}>
            <Text style={[styles.imageTitle, { color: colors.text }]}>
              📁 Imagem Local (require)
            </Text>
            <Text style={[styles.imageDescription, { color: colors.textSecondary }]}>
              Incluída no bundle do app. Sempre disponível offline.
            </Text>
            
            {/* 
              Para funcionar, você precisaria adicionar uma imagem em:
              assets/images/local-image.png
              
              Por enquanto, vou usar o ícone padrão do Expo
            */}
            <View style={styles.imageContainer}>
              <View style={[styles.placeholderImage, { borderColor: colors.border }]}>
                <Text style={{ fontSize: 48 }}>🖼️</Text>
                <Text style={[styles.placeholderText, { color: colors.textSecondary }]}>
                  Imagem Local
                </Text>
              </View>
            </View>

            <View style={styles.codeBlock}>
              <Text style={styles.codeText}>
                {`// Imagem local (no bundle)
<Image
  source={require('../assets/logo.png')}
  style={{ width: 100, height: 100 }}
/>`}
              </Text>
            </View>
          </View>

          {/* Imagem Remota */}
          <View style={styles.imageExample}>
            <Text style={[styles.imageTitle, { color: colors.text }]}>
              🌐 Imagem Remota (URI)
            </Text>
            <Text style={[styles.imageDescription, { color: colors.textSecondary }]}>
              Baixada da internet. Requer conexão.
            </Text>
            
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
                style={styles.remoteImage}
                resizeMode="contain"
              />
            </View>

            <View style={styles.codeBlock}>
              <Text style={styles.codeText}>
                {`// Imagem remota (URL)
<Image
  source={{ uri: 'https://...' }}
  style={{ width: 100, height: 100 }}
  resizeMode="contain"
/>`}
              </Text>
            </View>
          </View>

          {/* Diferenças */}
          <View style={[styles.comparisonBox, { backgroundColor: colors.background }]}>
            <Text style={[styles.comparisonTitle, { color: colors.text }]}>
              📊 Comparação
            </Text>
            
            <View style={styles.comparisonRow}>
              <Text style={[styles.comparisonLabel, { color: colors.text }]}>
                💾 Tamanho do App:
              </Text>
              <Text style={[styles.comparisonValue, { color: colors.textSecondary }]}>
                Local ↑ | Remota ↓
              </Text>
            </View>

            <View style={styles.comparisonRow}>
              <Text style={[styles.comparisonLabel, { color: colors.text }]}>
                📡 Requer Internet:
              </Text>
              <Text style={[styles.comparisonValue, { color: colors.textSecondary }]}>
                Local ❌ | Remota ✅
              </Text>
            </View>

            <View style={styles.comparisonRow}>
              <Text style={[styles.comparisonLabel, { color: colors.text }]}>
                ⚡ Performance:
              </Text>
              <Text style={[styles.comparisonValue, { color: colors.textSecondary }]}>
                Local ⭐⭐⭐ | Remota ⭐⭐
              </Text>
            </View>

            <View style={styles.comparisonRow}>
              <Text style={[styles.comparisonLabel, { color: colors.text }]}>
                🔄 Atualização:
              </Text>
              <Text style={[styles.comparisonValue, { color: colors.textSecondary }]}>
                Local (App Update) | Remota (Imediata)
              </Text>
            </View>
          </View>
        </View>

        {/* Dica */}
        <View style={[styles.tipBox, { backgroundColor: colors.warning + '20' }]}>
          <Text style={[styles.tipTitle, { color: colors.warning }]}>
            💡 Dica
          </Text>
          <Text style={[styles.tipText, { color: colors.text }]}>
            Use imagens locais para: ícones, logos, assets estáticos.{'\n'}
            Use imagens remotas para: fotos de usuários, conteúdo dinâmico, galeria.
          </Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  section: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 16,
  },
  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    marginBottom: 16,
  },
  themeInfo: {
    flex: 1,
  },
  themeLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  themeSubtext: {
    fontSize: 12,
  },
  colorPalette: {
    marginBottom: 16,
  },
  paletteTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorItem: {
    width: '30%',
    alignItems: 'center',
  },
  colorBox: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginBottom: 6,
  },
  colorBoxBorder: {
    borderWidth: 1,
    borderColor: '#ddd',
  },
  colorName: {
    fontSize: 10,
    fontWeight: '600',
    marginBottom: 2,
  },
  colorValue: {
    fontSize: 9,
    fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace' }),
  },
  imageExample: {
    marginBottom: 20,
  },
  imageTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  imageDescription: {
    fontSize: 12,
    marginBottom: 12,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  placeholderImage: {
    width: 150,
    height: 150,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 11,
    marginTop: 8,
  },
  remoteImage: {
    width: 150,
    height: 150,
  },
  comparisonBox: {
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  comparisonTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  comparisonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  comparisonLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
  comparisonValue: {
    fontSize: 12,
  },
  tipBox: {
    borderRadius: 12,
    padding: 12,
  },
  tipTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  tipText: {
    fontSize: 12,
    lineHeight: 18,
  },
  codeBlock: {
    backgroundColor: '#2c3e50',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  codeTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#f1c40f',
    marginBottom: 8,
  },
  codeText: {
    fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace' }),
    fontSize: 10,
    color: '#ecf0f1',
    lineHeight: 16,
  },
});
