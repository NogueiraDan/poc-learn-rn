/**
 * ====================================================================
 * 🪟 MODAL SCREEN - Modais em React Native
 * ====================================================================
 * 
 * CONCEITOS DEMONSTRADOS:
 * 
 * 1. Modal - Componente nativo para sobrepor conteúdo
 * 2. Diferentes tipos de apresentação (slide, fade)
 * 3. Modal transparente com backdrop
 * 4. Bottom Sheet básico
 * 
 * IMPORTANTE:
 * - Modal renderiza em uma camada separada (acima de tudo)
 * - animationType: 'slide', 'fade', 'none'
 * - transparent: permite ver conteúdo atrás do modal
 * - Para modais complexos, use bibliotecas como react-native-modal
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../contexts';

export default function ModalScreen() {
  const { colors } = useTheme();
  
  // Estados para controlar cada tipo de modal
  const [simpleModalVisible, setSimpleModalVisible] = useState(false);
  const [transparentModalVisible, setTransparentModalVisible] = useState(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [formModalVisible, setFormModalVisible] = useState(false);
  
  // Estado do formulário do modal
  const [formData, setFormData] = useState({ name: '', email: '' });

  // Handler do formulário
  const handleFormSubmit = () => {
    Alert.alert('Sucesso!', `Nome: ${formData.name}\nEmail: ${formData.email}`);
    setFormModalVisible(false);
    setFormData({ name: '', email: '' });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Info Box */}
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>🪟 Modais</Text>
          <Text style={styles.infoText}>
            Componente nativo para exibir conteúdo sobreposto.{'\n'}
            Ideal para: confirmações, formulários, detalhes.
          </Text>
        </View>

        {/* ============================================
            1. MODAL SIMPLES
            ============================================ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Modal Simples (Slide)</Text>
          <Text style={styles.description}>
            Modal com animação de slide (desliza de baixo para cima).
          </Text>
          
          <TouchableOpacity
            style={styles.button}
            onPress={() => setSimpleModalVisible(true)}
          >
            <Text style={styles.buttonText}>Abrir Modal Simples</Text>
          </TouchableOpacity>

          {/* Modal Simples */}
          <Modal
            animationType="slide"
            transparent={false}
            visible={simpleModalVisible}
            onRequestClose={() => setSimpleModalVisible(false)}
            // statusBarTranslucent - Android: modal vai sob a status bar
          >
            <SafeAreaView style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Modal Simples</Text>
                <TouchableOpacity onPress={() => setSimpleModalVisible(false)}>
                  <Text style={styles.closeButton}>✕</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>
                  Este é um modal com animação de slide.{'\n\n'}
                  • animationType="slide"{'\n'}
                  • transparent={'{false}'}{'\n'}
                  • Ocupa tela inteira
                </Text>
              </View>
              
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setSimpleModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Fechar</Text>
              </TouchableOpacity>
            </SafeAreaView>
          </Modal>
        </View>

        {/* ============================================
            2. MODAL TRANSPARENTE (OVERLAY)
            ============================================ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Modal Transparente (Overlay)</Text>
          <Text style={styles.description}>
            Modal com fundo semi-transparente (backdrop).
            Usado para alerts, confirmações.
          </Text>
          
          <TouchableOpacity
            style={styles.button}
            onPress={() => setTransparentModalVisible(true)}
          >
            <Text style={styles.buttonText}>Abrir Modal Transparente</Text>
          </TouchableOpacity>

          {/* Modal Transparente */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={transparentModalVisible}
            onRequestClose={() => setTransparentModalVisible(false)}
          >
            {/* Backdrop - fundo escurecido */}
            <TouchableOpacity 
              style={styles.backdrop}
              activeOpacity={1}
              onPress={() => setTransparentModalVisible(false)}
            >
              {/* Card do modal - stopPropagation ao tocar */}
              <TouchableOpacity 
                activeOpacity={1}
                onPress={(e) => e.stopPropagation()}
              >
                <View style={styles.alertBox}>
                  <Text style={styles.alertTitle}>⚠️ Atenção</Text>
                  <Text style={styles.alertText}>
                    Este é um modal transparente com backdrop.{'\n\n'}
                    Toque fora para fechar.
                  </Text>
                  
                  <View style={styles.alertButtons}>
                    <TouchableOpacity
                      style={styles.alertButtonCancel}
                      onPress={() => setTransparentModalVisible(false)}
                    >
                      <Text style={styles.alertButtonCancelText}>Cancelar</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      style={styles.alertButtonConfirm}
                      onPress={() => {
                        setTransparentModalVisible(false);
                        Alert.alert('Confirmado!');
                      }}
                    >
                      <Text style={styles.alertButtonConfirmText}>Confirmar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            </TouchableOpacity>
          </Modal>
        </View>

        {/* ============================================
            3. BOTTOM SHEET
            ============================================ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bottom Sheet</Text>
          <Text style={styles.description}>
            Modal que desliza de baixo, comum em apps mobile.
            Excelente para ações rápidas e menus.
          </Text>
          
          <TouchableOpacity
            style={styles.button}
            onPress={() => setBottomSheetVisible(true)}
          >
            <Text style={styles.buttonText}>Abrir Bottom Sheet</Text>
          </TouchableOpacity>

          {/* Bottom Sheet */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={bottomSheetVisible}
            onRequestClose={() => setBottomSheetVisible(false)}
          >
            <TouchableOpacity 
              style={styles.bottomSheetBackdrop}
              activeOpacity={1}
              onPress={() => setBottomSheetVisible(false)}
            >
              <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
                <View style={styles.bottomSheetContainer}>
                  {/* Handle indicator */}
                  <View style={styles.bottomSheetHandle} />
                  
                  <Text style={styles.bottomSheetTitle}>Opções</Text>
                  
                  <View style={styles.bottomSheetOptions}>
                    {['📷 Câmera', '🖼️ Galeria', '📁 Arquivos', '🔗 Link'].map((option) => (
                      <TouchableOpacity
                        key={option}
                        style={styles.bottomSheetOption}
                        onPress={() => {
                          setBottomSheetVisible(false);
                          setTimeout(() => Alert.alert('Selecionado', option), 300);
                        }}
                      >
                        <Text style={styles.bottomSheetOptionText}>{option}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  
                  <TouchableOpacity
                    style={styles.bottomSheetCancel}
                    onPress={() => setBottomSheetVisible(false)}
                  >
                    <Text style={styles.bottomSheetCancelText}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </TouchableOpacity>
          </Modal>
        </View>

        {/* ============================================
            4. MODAL COM FORMULÁRIO
            ============================================ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Modal com Formulário</Text>
          <Text style={styles.description}>
            Modal para coletar dados do usuário.
          </Text>
          
          <TouchableOpacity
            style={styles.button}
            onPress={() => setFormModalVisible(true)}
          >
            <Text style={styles.buttonText}>Abrir Formulário</Text>
          </TouchableOpacity>

          {/* Modal de Formulário */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={formModalVisible}
            onRequestClose={() => setFormModalVisible(false)}
          >
            <View style={styles.formModalBackdrop}>
              <View style={styles.formModalContainer}>
                <View style={styles.formModalHeader}>
                  <Text style={styles.formModalTitle}>Novo Cadastro</Text>
                  <TouchableOpacity onPress={() => setFormModalVisible(false)}>
                    <Text style={styles.formModalClose}>✕</Text>
                  </TouchableOpacity>
                </View>
                
                <View style={styles.formModalContent}>
                  <Text style={styles.formLabel}>Nome</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="Digite seu nome"
                    value={formData.name}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
                  />
                  
                  <Text style={styles.formLabel}>Email</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="Digite seu email"
                    keyboardType="email-address"
                    value={formData.email}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
                  />
                  
                  <TouchableOpacity
                    style={styles.formSubmitButton}
                    onPress={handleFormSubmit}
                  >
                    <Text style={styles.formSubmitButtonText}>Salvar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>

        {/* Code Example */}
        <View style={styles.codeBlock}>
          <Text style={styles.codeTitle}>💻 Exemplo de Código</Text>
          <Text style={styles.codeText}>
            {`const [visible, setVisible] = useState(false);

<Modal
  animationType="slide"     // slide, fade, none
  transparent={true}        // backdrop transparente
  visible={visible}
  onRequestClose={() => setVisible(false)}
>
  <View style={styles.backdrop}>
    <View style={styles.modalContent}>
      <Text>Conteúdo do Modal</Text>
      <Button 
        onPress={() => setVisible(false)}
        title="Fechar" 
      />
    </View>
  </View>
</Modal>`}
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
  infoBox: {
    backgroundColor: '#e8f4f8',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#3498db',
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2980b9',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 12,
    color: '#34495e',
    lineHeight: 18,
  },
  section: {
    backgroundColor: '#ffffff',
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: '#7f8c8d',
    marginBottom: 12,
    lineHeight: 18,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  // Modal Simples
  modalContainer: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#3498db',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  closeButton: {
    fontSize: 24,
    color: '#ffffff',
    paddingHorizontal: 8,
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  modalText: {
    fontSize: 15,
    color: '#2c3e50',
    lineHeight: 24,
  },
  modalButton: {
    backgroundColor: '#3498db',
    margin: 20,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // Modal Transparente
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertBox: {
    backgroundColor: '#ffffff',
    width: 300,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
    textAlign: 'center',
  },
  alertText: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  alertButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  alertButtonCancel: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bdc3c7',
    alignItems: 'center',
  },
  alertButtonCancelText: {
    color: '#7f8c8d',
    fontWeight: '600',
  },
  alertButtonConfirm: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#3498db',
    alignItems: 'center',
  },
  alertButtonConfirmText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  // Bottom Sheet
  bottomSheetBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheetContainer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 20,
  },
  bottomSheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#ddd',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  bottomSheetOptions: {
    paddingHorizontal: 8,
  },
  bottomSheetOption: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  bottomSheetOptionText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  bottomSheetCancel: {
    marginHorizontal: 20,
    marginTop: 8,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
  },
  bottomSheetCancelText: {
    color: '#7f8c8d',
    fontWeight: '600',
    fontSize: 16,
  },
  // Form Modal
  formModalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  formModalContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
  },
  formModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#3498db',
  },
  formModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  formModalClose: {
    fontSize: 24,
    color: '#ffffff',
    paddingHorizontal: 8,
  },
  formModalContent: {
    padding: 20,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  formInput: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  formSubmitButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  formSubmitButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // Code Block
  codeBlock: {
    backgroundColor: '#2c3e50',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
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
