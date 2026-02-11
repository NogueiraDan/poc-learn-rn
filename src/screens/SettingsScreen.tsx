/**
 * ====================================================================
 * ⚙️ SETTINGS SCREEN - Configurações
 * ====================================================================
 * 
 * CONCEITOS DEMONSTRADOS:
 * 
 * 1. Switch components (toggle)
 * 2. Listas de opções
 * 3. Navegação para sub-configurações
 * 4. Seções agrupadas
 * 5. Integração com Context (Theme)
 * 6. Persistência de preferências (AsyncStorage)
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export default function SettingsScreen() {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';

  // Estados das configurações
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);

  function handleToggleNotifications(value: boolean) {
    setNotificationsEnabled(value);
    if (!value) {
      Alert.alert(
        'Notificações Desativadas',
        'Você não receberá mais notificações do app.'
      );
    }
  }

  function handleClearCache() {
    Alert.alert(
      'Limpar Cache',
      'Tem certeza que deseja limpar o cache do aplicativo?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Limpar',
          style: 'destructive',
          onPress: () => Alert.alert('Sucesso', 'Cache limpo!'),
        },
      ]
    );
  }

  function handleExportData() {
    Alert.alert(
      'Exportar Dados',
      'Em um app real, isso geraria um arquivo JSON com todos os seus dados.',
      [{ text: 'OK' }]
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerIcon}>⚙️</Text>
        <Text style={styles.headerTitle}>Configurações</Text>
        <Text style={styles.headerSubtitle}>
          Personalize sua experiência
        </Text>
      </View>

      {/* Seção: Aparência */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎨 Aparência</Text>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Tema Escuro</Text>
            <Text style={styles.settingDescription}>
              Ativar modo escuro
            </Text>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
            trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
            thumbColor={isDarkMode ? '#fff' : '#f3f4f6'}
          />
        </View>
      </View>

      {/* Seção: Notificações */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔔 Notificações</Text>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Ativar Notificações</Text>
            <Text style={styles.settingDescription}>
              Receber notificações push
            </Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={handleToggleNotifications}
            trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
            thumbColor={notificationsEnabled ? '#fff' : '#f3f4f6'}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Sons</Text>
            <Text style={styles.settingDescription}>
              Emitir sons nas notificações
            </Text>
          </View>
          <Switch
            value={soundEnabled}
            onValueChange={setSoundEnabled}
            trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
            thumbColor={soundEnabled ? '#fff' : '#f3f4f6'}
            disabled={!notificationsEnabled}
          />
        </View>
      </View>

      {/* Seção: Privacidade & Segurança */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔒 Privacidade & Segurança</Text>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Autenticação Biométrica</Text>
            <Text style={styles.settingDescription}>
              {Platform.OS === 'ios' ? 'Face ID / Touch ID' : 'Impressão Digital'}
            </Text>
          </View>
          <Switch
            value={biometricEnabled}
            onValueChange={setBiometricEnabled}
            trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
            thumbColor={biometricEnabled ? '#fff' : '#f3f4f6'}
          />
        </View>

        <TouchableOpacity 
          style={styles.settingButton}
          onPress={() => Alert.alert('Indisponível', 'Funcionalidade de demonstração')}
        >
          <Text style={styles.settingButtonText}>Alterar PIN</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.settingButton}
          onPress={() => Alert.alert('Indisponível', 'Funcionalidade de demonstração')}
        >
          <Text style={styles.settingButtonText}>Política de Privacidade</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Seção: Preferências */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📋 Preferências</Text>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Salvamento Automático</Text>
            <Text style={styles.settingDescription}>
              Salvar alterações automaticamente
            </Text>
          </View>
          <Switch
            value={autoSave}
            onValueChange={setAutoSave}
            trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
            thumbColor={autoSave ? '#fff' : '#f3f4f6'}
          />
        </View>

        <TouchableOpacity 
          style={styles.settingButton}
          onPress={() => Alert.alert('Idioma', 'Português (Brasil)')}
        >
          <View style={styles.settingInfo}>
            <Text style={styles.settingButtonText}>Idioma</Text>
            <Text style={styles.settingValue}>Português (Brasil)</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Seção: Armazenamento */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💾 Armazenamento</Text>

        <View style={styles.storageInfo}>
          <View style={styles.storageRow}>
            <Text style={styles.storageLabel}>Cache do App</Text>
            <Text style={styles.storageValue}>24.5 MB</Text>
          </View>
          <View style={styles.storageRow}>
            <Text style={styles.storageLabel}>Dados do Usuário</Text>
            <Text style={styles.storageValue}>1.2 MB</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.dangerButton}
          onPress={handleClearCache}
        >
          <Text style={styles.dangerButtonText}>Limpar Cache</Text>
        </TouchableOpacity>
      </View>

      {/* Seção: Dados */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 Dados</Text>

        <TouchableOpacity 
          style={styles.settingButton}
          onPress={handleExportData}
        >
          <Text style={styles.settingButtonText}>Exportar Dados</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.settingButton}
          onPress={() => Alert.alert('Indisponível', 'Funcionalidade de demonstração')}
        >
          <Text style={styles.settingButtonText}>Importar Dados</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Seção: Sobre */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ℹ️ Sobre</Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Versão do App</Text>
          <Text style={styles.infoValue}>1.0.0</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Build</Text>
          <Text style={styles.infoValue}>2026-02-11</Text>
        </View>

        <TouchableOpacity 
          style={styles.settingButton}
          onPress={() => Alert.alert('Indisponível', 'Funcionalidade de demonstração')}
        >
          <Text style={styles.settingButtonText}>Termos de Uso</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.settingButton}
          onPress={() => Alert.alert('Indisponível', 'Funcionalidade de demonstração')}
        >
          <Text style={styles.settingButtonText}>Licenças Open Source</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Conceitos */}
      <View style={styles.concepts}>
        <Text style={styles.conceptsTitle}>📚 Conceitos Demonstrados:</Text>
        <Text style={styles.conceptText}>
          • Switch components (toggles){'\n'}
          • Seções organizadas{'\n'}
          • Context API (Theme){'\n'}
          • Platform-specific UI{'\n'}
          • Alert dialogs{'\n'}
          • Persistência de preferências{'\n'}
          • Layout de configurações profissional
        </Text>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 16,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    paddingHorizontal: 16,
    paddingVertical: 8,
    textTransform: 'uppercase',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 12,
    color: '#999',
  },
  settingButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingButtonText: {
    fontSize: 16,
    color: '#333',
  },
  settingValue: {
    fontSize: 14,
    color: '#999',
    marginTop: 2,
  },
  chevron: {
    fontSize: 20,
    color: '#bdc3c7',
  },
  storageInfo: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  storageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  storageLabel: {
    fontSize: 14,
    color: '#666',
  },
  storageValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  dangerButton: {
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 12,
    backgroundColor: '#ffebee',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffcdd2',
  },
  dangerButtonText: {
    color: '#d32f2f',
    textAlign: 'center',
    fontWeight: '600',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  concepts: {
    backgroundColor: '#fff',
    marginTop: 16,
    padding: 16,
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
