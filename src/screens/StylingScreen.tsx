/**
 * ====================================================================
 * 🎨 STYLING SCREEN - Estilização em React Native
 * ====================================================================
 * 
 * CONCEITOS DEMONSTRADOS:
 * 
 * 1. StyleSheet.create() - Forma otimizada de criar estilos
 * 2. Flexbox - Layout padrão (diferenças da web)
 * 3. Dimensões - width, height, flex
 * 4. Cores e Sombras
 * 5. Bordas e Bordas Arredondadas
 * 6. Estilos Condicionais e Dinâmicos
 * 
 * IMPORTANTE - Diferenças do CSS Web:
 * - flexDirection é 'column' por padrão (na web é 'row')
 * - Não existe cascata de estilos
 * - Não existe herança de estilos (exceto dentro de Text)
 * - Valores numéricos são em "density-independent pixels"
 * - Propriedades em camelCase
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  useWindowDimensions, // Hook para dimensões responsivas
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function StylingScreen() {
  // Hook que atualiza quando a orientação muda
  const { width, height } = useWindowDimensions();
  
  // Estado para demonstrar estilos dinâmicos
  const [activeColor, setActiveColor] = useState('#3498db');

  const colors = ['#3498db', '#2ecc71', '#e74c3c', '#9b59b6', '#f39c12'];

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
      >
        {/* ============================================
            SEÇÃO 1: FLEXBOX BASICS
            ============================================ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📐 Flexbox - Conceitos Básicos</Text>
          <Text style={styles.description}>
            React Native usa Flexbox por padrão. A principal diferença da web:
            flexDirection é 'column' por padrão!
          </Text>

          {/* flexDirection: column (padrão) */}
          <Text style={styles.label}>flexDirection: 'column' (padrão)</Text>
          <View style={styles.flexColumnContainer}>
            <View style={[styles.flexItem, { backgroundColor: '#3498db' }]}>
              <Text style={styles.flexItemText}>1</Text>
            </View>
            <View style={[styles.flexItem, { backgroundColor: '#2ecc71' }]}>
              <Text style={styles.flexItemText}>2</Text>
            </View>
            <View style={[styles.flexItem, { backgroundColor: '#e74c3c' }]}>
              <Text style={styles.flexItemText}>3</Text>
            </View>
          </View>

          {/* flexDirection: row */}
          <Text style={[styles.label, { marginTop: 16 }]}>
            flexDirection: 'row'
          </Text>
          <View style={styles.flexRowContainer}>
            <View style={[styles.flexItem, { backgroundColor: '#3498db' }]}>
              <Text style={styles.flexItemText}>1</Text>
            </View>
            <View style={[styles.flexItem, { backgroundColor: '#2ecc71' }]}>
              <Text style={styles.flexItemText}>2</Text>
            </View>
            <View style={[styles.flexItem, { backgroundColor: '#e74c3c' }]}>
              <Text style={styles.flexItemText}>3</Text>
            </View>
          </View>
        </View>

        {/* ============================================
            SEÇÃO 2: JUSTIFY CONTENT & ALIGN ITEMS
            ============================================ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>↔️ Alinhamento (justify & align)</Text>
          <Text style={styles.description}>
            justifyContent: alinha no eixo principal{'\n'}
            alignItems: alinha no eixo cruzado
          </Text>

          {/* justifyContent examples */}
          <Text style={styles.label}>justifyContent: 'space-between'</Text>
          <View style={[styles.alignContainer, { justifyContent: 'space-between' }]}>
            <View style={styles.smallBox} />
            <View style={styles.smallBox} />
            <View style={styles.smallBox} />
          </View>

          <Text style={[styles.label, { marginTop: 12 }]}>
            justifyContent: 'space-around'
          </Text>
          <View style={[styles.alignContainer, { justifyContent: 'space-around' }]}>
            <View style={styles.smallBox} />
            <View style={styles.smallBox} />
            <View style={styles.smallBox} />
          </View>

          <Text style={[styles.label, { marginTop: 12 }]}>
            justifyContent: 'space-evenly'
          </Text>
          <View style={[styles.alignContainer, { justifyContent: 'space-evenly' }]}>
            <View style={styles.smallBox} />
            <View style={styles.smallBox} />
            <View style={styles.smallBox} />
          </View>

          {/* alignItems examples */}
          <Text style={[styles.label, { marginTop: 16 }]}>
            alignItems: 'flex-start' | 'center' | 'flex-end'
          </Text>
          <View style={styles.alignItemsRow}>
            <View style={[styles.tallContainer, { alignItems: 'flex-start' }]}>
              <View style={styles.tinyBox} />
            </View>
            <View style={[styles.tallContainer, { alignItems: 'center' }]}>
              <View style={styles.tinyBox} />
            </View>
            <View style={[styles.tallContainer, { alignItems: 'flex-end' }]}>
              <View style={styles.tinyBox} />
            </View>
          </View>
        </View>

        {/* ============================================
            SEÇÃO 3: FLEX GROW / SHRINK
            ============================================ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Flex (grow/shrink)</Text>
          <Text style={styles.description}>
            flex: 1 faz o item ocupar o espaço disponível.
            Múltiplos itens com flex dividem o espaço proporcionalmente.
          </Text>

          <Text style={styles.label}>flex: 1 (igual para todos)</Text>
          <View style={styles.flexGrowContainer}>
            <View style={[styles.flexGrowItem, { flex: 1, backgroundColor: '#3498db' }]}>
              <Text style={styles.flexItemText}>flex: 1</Text>
            </View>
            <View style={[styles.flexGrowItem, { flex: 1, backgroundColor: '#2ecc71' }]}>
              <Text style={styles.flexItemText}>flex: 1</Text>
            </View>
            <View style={[styles.flexGrowItem, { flex: 1, backgroundColor: '#e74c3c' }]}>
              <Text style={styles.flexItemText}>flex: 1</Text>
            </View>
          </View>

          <Text style={[styles.label, { marginTop: 12 }]}>
            flex: 1, flex: 2, flex: 1 (proporções)
          </Text>
          <View style={styles.flexGrowContainer}>
            <View style={[styles.flexGrowItem, { flex: 1, backgroundColor: '#3498db' }]}>
              <Text style={styles.flexItemText}>1</Text>
            </View>
            <View style={[styles.flexGrowItem, { flex: 2, backgroundColor: '#2ecc71' }]}>
              <Text style={styles.flexItemText}>2</Text>
            </View>
            <View style={[styles.flexGrowItem, { flex: 1, backgroundColor: '#e74c3c' }]}>
              <Text style={styles.flexItemText}>1</Text>
            </View>
          </View>
        </View>

        {/* ============================================
            SEÇÃO 4: SOMBRAS (iOS vs Android)
            ============================================ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🌑 Sombras (iOS vs Android)</Text>
          <Text style={styles.description}>
            iOS e Android têm sistemas de sombra diferentes!
            iOS usa shadow*, Android usa elevation.
          </Text>

          <View style={styles.shadowExamplesContainer}>
            {/* Sombra leve */}
            <View style={[styles.shadowBox, styles.shadowLight]}>
              <Text style={styles.shadowLabel}>Leve</Text>
              <Text style={styles.shadowSublabel}>elevation: 2</Text>
            </View>

            {/* Sombra média */}
            <View style={[styles.shadowBox, styles.shadowMedium]}>
              <Text style={styles.shadowLabel}>Média</Text>
              <Text style={styles.shadowSublabel}>elevation: 5</Text>
            </View>

            {/* Sombra forte */}
            <View style={[styles.shadowBox, styles.shadowHeavy]}>
              <Text style={styles.shadowLabel}>Forte</Text>
              <Text style={styles.shadowSublabel}>elevation: 10</Text>
            </View>
          </View>

          <View style={styles.codeBlock}>
            <Text style={styles.codeText}>
              {`// Sombra que funciona em ambas plataformas
const shadow = {
  // iOS
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  // Android
  elevation: 5,
};`}
            </Text>
          </View>
        </View>

        {/* ============================================
            SEÇÃO 5: BORDAS
            ============================================ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔲 Bordas e Bordas Arredondadas</Text>
          <Text style={styles.description}>
            borderRadius pode ser aplicado a cada canto individualmente.
          </Text>

          <View style={styles.borderExamplesContainer}>
            <View style={styles.borderSquare}>
              <Text style={styles.borderLabel}>Quadrado</Text>
            </View>
            <View style={styles.borderRounded}>
              <Text style={styles.borderLabel}>Arredondado</Text>
            </View>
            <View style={styles.borderCircle}>
              <Text style={styles.borderLabel}>Círculo</Text>
            </View>
            <View style={styles.borderCustom}>
              <Text style={styles.borderLabel}>Custom</Text>
            </View>
          </View>

          <View style={styles.codeBlock}>
            <Text style={styles.codeText}>
              {`// Bordas individuais
{
  borderTopLeftRadius: 20,
  borderTopRightRadius: 0,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 20,
}

// Círculo perfeito
{
  width: 60,
  height: 60,
  borderRadius: 30, // metade do width/height
}`}
            </Text>
          </View>
        </View>

        {/* ============================================
            SEÇÃO 6: ESTILOS DINÂMICOS
            ============================================ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔄 Estilos Dinâmicos</Text>
          <Text style={styles.description}>
            Estilos podem ser calculados/alterados em runtime.
            Use arrays de estilos ou estilos inline.
          </Text>

          {/* Seletor de cores */}
          <View style={styles.colorSelector}>
            {colors.map((color) => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorOption,
                  { backgroundColor: color },
                  activeColor === color && styles.colorOptionActive,
                ]}
                onPress={() => setActiveColor(color)}
              />
            ))}
          </View>

          {/* Box com cor dinâmica */}
          <View style={[styles.dynamicBox, { backgroundColor: activeColor }]}>
            <Text style={styles.dynamicBoxText}>
              Cor Selecionada: {activeColor}
            </Text>
          </View>

          <View style={styles.codeBlock}>
            <Text style={styles.codeText}>
              {`// Array de estilos
<View style={[
  styles.base,
  isActive && styles.active,
  { backgroundColor: dynamicColor }
]} />

// Estilo condicional
<View style={[
  styles.button,
  disabled ? styles.disabled : styles.enabled
]} />`}
            </Text>
          </View>
        </View>

        {/* ============================================
            SEÇÃO 7: DIMENSÕES RESPONSIVAS
            ============================================ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📏 Dimensões Responsivas</Text>
          <Text style={styles.description}>
            Use useWindowDimensions() para layouts responsivos.
            Atualiza automaticamente ao rotacionar o dispositivo.
          </Text>

          <View style={styles.dimensionsInfo}>
            <Text style={styles.dimensionText}>
              Largura: {width.toFixed(0)}px
            </Text>
            <Text style={styles.dimensionText}>
              Altura: {height.toFixed(0)}px
            </Text>
            <Text style={styles.dimensionText}>
              Orientação: {width > height ? 'Paisagem' : 'Retrato'}
            </Text>
          </View>

          {/* Box responsivo - 90% da largura */}
          <View style={[styles.responsiveBox, { width: width * 0.85 }]}>
            <Text style={styles.responsiveBoxText}>
              Esta box tem 85% da largura da tela
            </Text>
          </View>

          <View style={styles.codeBlock}>
            <Text style={styles.codeText}>
              {`import { useWindowDimensions } from 'react-native';

function MyComponent() {
  const { width, height } = useWindowDimensions();
  
  return (
    <View style={{ width: width * 0.9 }}>
      {/* 90% da largura da tela */}
    </View>
  );
}`}
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
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#7f8c8d',
    marginBottom: 8,
  },
  codeBlock: {
    backgroundColor: '#2c3e50',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
  },
  codeText: {
    fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace' }),
    fontSize: 11,
    color: '#ecf0f1',
    lineHeight: 18,
  },
  // Flexbox examples
  flexColumnContainer: {
    flexDirection: 'column', // Padrão, mas explícito para clareza
    backgroundColor: '#f8f9fa',
    padding: 8,
    borderRadius: 8,
  },
  flexRowContainer: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    padding: 8,
    borderRadius: 8,
  },
  flexItem: {
    padding: 12,
    margin: 4,
    borderRadius: 6,
    alignItems: 'center',
  },
  flexItemText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  // Alignment examples
  alignContainer: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    padding: 8,
    borderRadius: 8,
    height: 50,
  },
  smallBox: {
    width: 40,
    height: 30,
    backgroundColor: '#3498db',
    borderRadius: 4,
  },
  alignItemsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tallContainer: {
    width: 60,
    height: 80,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 4,
  },
  tinyBox: {
    width: 30,
    height: 30,
    backgroundColor: '#9b59b6',
    borderRadius: 4,
  },
  // Flex grow examples
  flexGrowContainer: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    overflow: 'hidden',
  },
  flexGrowItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Shadow examples
  shadowExamplesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  shadowBox: {
    width: 80,
    height: 80,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadowLight: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 2,
  },
  shadowMedium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  shadowHeavy: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  shadowLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  shadowSublabel: {
    fontSize: 10,
    color: '#7f8c8d',
    marginTop: 2,
  },
  // Border examples
  borderExamplesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  borderSquare: {
    width: 60,
    height: 60,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderRounded: {
    width: 60,
    height: 60,
    backgroundColor: '#2ecc71',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderCircle: {
    width: 60,
    height: 60,
    backgroundColor: '#e74c3c',
    borderRadius: 30, // Metade do width/height = círculo
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderCustom: {
    width: 60,
    height: 60,
    backgroundColor: '#9b59b6',
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderLabel: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  // Dynamic styles
  colorSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 12,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  colorOptionActive: {
    borderColor: '#2c3e50',
    transform: [{ scale: 1.1 }],
  },
  dynamicBox: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  dynamicBoxText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  // Responsive dimensions
  dimensionsInfo: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  dimensionText: {
    fontSize: 14,
    color: '#2c3e50',
    marginBottom: 4,
  },
  responsiveBox: {
    alignSelf: 'center',
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 8,
  },
  responsiveBoxText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '500',
  },
});
