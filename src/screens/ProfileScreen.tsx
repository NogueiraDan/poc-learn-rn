/**
 * ====================================================================
 * 👤 PROFILE SCREEN - Perfil do Usuário
 * ====================================================================
 * 
 * CONCEITOS DEMONSTRADOS:
 * 
 * 1. Exibição de dados do usuário autenticado
 * 2. Formulário de edição (UI apenas)
 * 3. Avatar placeholder
 * 4. Informações editáveis e não editáveis
 * 5. Modal de confirmação
 * 6. Seções organizadas
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function ProfileScreen() {
  const { user } = useAuth();
  
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState('(11) 98765-4321');
  const [bio, setBio] = useState('Desenvolvedor apaixonado por React Native');

  function handleSave() {
    Alert.alert(
      'Salvar Alterações',
      'Em um app real, isso salvaria os dados no backend.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Salvar',
          onPress: () => {
            setEditMode(false);
            Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
          },
        },
      ]
    );
  }

  function handleCancel() {
    setName(user?.name || '');
    setEditMode(false);
  }

  function handleChangeAvatar() {
    Alert.alert(
      'Alterar Foto',
      'Em um app real, isso abriria:\n\n• Câmera\n• Galeria de fotos\n• Crop de imagem',
      [{ text: 'OK' }]
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header com Avatar */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.name.charAt(0).toUpperCase()}
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.changePhotoButton}
            onPress={handleChangeAvatar}
          >
            <Text style={styles.changePhotoText}>📷</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.roleBadge}>
          {user?.role === 'admin' ? '👑 Administrador' : '👤 Usuário'}
        </Text>
      </View>

      {/* Informações Pessoais */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Informações Pessoais</Text>
          {!editMode ? (
            <TouchableOpacity onPress={() => setEditMode(true)}>
              <Text style={styles.editButton}>✏️ Editar</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.editActions}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={handleCancel}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.saveButton}
                onPress={handleSave}
              >
                <Text style={styles.saveButtonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Nome */}
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Nome</Text>
          {editMode ? (
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Digite seu nome"
            />
          ) : (
            <Text style={styles.fieldValue}>{name}</Text>
          )}
        </View>

        {/* Email (não editável) */}
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Email</Text>
          <View style={styles.fieldValueContainer}>
            <Text style={styles.fieldValue}>{user?.email}</Text>
            <Text style={styles.fieldNote}>Não pode ser alterado</Text>
          </View>
        </View>

        {/* Telefone */}
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Telefone</Text>
          {editMode ? (
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="Digite seu telefone"
              keyboardType="phone-pad"
            />
          ) : (
            <Text style={styles.fieldValue}>{phone}</Text>
          )}
        </View>

        {/* Bio */}
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Bio</Text>
          {editMode ? (
            <TextInput
              style={[styles.input, styles.textArea]}
              value={bio}
              onChangeText={setBio}
              placeholder="Escreva sobre você"
              multiline
              numberOfLines={3}
            />
          ) : (
            <Text style={styles.fieldValue}>{bio}</Text>
          )}
        </View>
      </View>

      {/* Informações da Conta */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informações da Conta</Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>ID do Usuário</Text>
          <Text style={styles.infoValue}>{user?.id}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Tipo de Conta</Text>
          <Text style={styles.infoValue}>
            {user?.role === 'admin' ? 'Administrador' : 'Usuário'}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Status</Text>
          <View style={styles.statusBadge}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Ativo</Text>
          </View>
        </View>
      </View>

      {/* Estatísticas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Estatísticas</Text>
        
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>10</Text>
            <Text style={styles.statLabel}>Módulos{"\n"}Visitados</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Telas{"\n"}Favoritas</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>7</Text>
            <Text style={styles.statLabel}>Dias de{"\n"}Uso</Text>
          </View>
        </View>
      </View>

      {/* Ações Perigosas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Zona de Perigo</Text>
        
        <TouchableOpacity 
          style={styles.dangerButton}
          onPress={() => Alert.alert('Ação Indisponível', 'Funcionalidade de demonstração')}
        >
          <Text style={styles.dangerButtonText}>🔒 Alterar Senha</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.dangerButton}
          onPress={() => Alert.alert('Ação Indisponível', 'Funcionalidade de demonstração')}
        >
          <Text style={styles.dangerButtonText}>🗑️ Excluir Conta</Text>
        </TouchableOpacity>
      </View>

      {/* Conceitos */}
      <View style={styles.concepts}>
        <Text style={styles.conceptsTitle}>📚 Conceitos Demonstrados:</Text>
        <Text style={styles.conceptText}>
          • Exibição de dados do usuário (Context API){'\n'}
          • Modo de edição com toggle{'\n'}
          • TextInput com diferentes tipos{'\n'}
          • Campos editáveis vs não editáveis{'\n'}
          • Avatar placeholder{'\n'}
          • Confirmação de ações (Alert){'\n'}
          • Layout de perfil profissional
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
  avatarContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
  },
  changePhotoButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  changePhotoText: {
    fontSize: 16,
  },
  roleBadge: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    fontSize: 14,
    fontWeight: '600',
    color: '#1976d2',
  },
  section: {
    backgroundColor: '#fff',
    margin: 16,
    marginBottom: 0,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  editButton: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '600',
  },
  editActions: {
    flexDirection: 'row',
    gap: 8,
  },
  cancelButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 14,
  },
  saveButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#2196F3',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  field: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  fieldValue: {
    fontSize: 16,
    color: '#333',
  },
  fieldValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fieldNote: {
    fontSize: 11,
    color: '#999',
    fontStyle: 'italic',
  },
  input: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4caf50',
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2e7d32',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
  },
  dangerButton: {
    backgroundColor: '#ffebee',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ffcdd2',
  },
  dangerButtonText: {
    color: '#d32f2f',
    textAlign: 'center',
    fontWeight: '600',
  },
  concepts: {
    backgroundColor: '#fff',
    margin: 16,
    marginTop: 0,
    padding: 16,
    borderRadius: 8,
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
