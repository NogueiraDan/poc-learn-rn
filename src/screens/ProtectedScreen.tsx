/**
 * ====================================================================
 * 🛡️ PROTECTED SCREEN - Tela Protegida (Exemplo)
 * ====================================================================
 * 
 * CONCEITOS DEMONSTRADOS:
 * 
 * 1. Tela Acessível Apenas para Usuários Autenticados
 * 2. Exibição de Dados do Usuário Logado
 * 3. Autorização Baseada em Roles (admin vs user)
 * 4. Logout Flow
 * 
 * IMPORTANTE:
 * -----------
 * Esta tela só é acessível se o usuário estiver autenticado.
 * A proteção é feita no Navigation.tsx (navegação condicional).
 * 
 * Em produção, você também deve validar permissões no BACKEND!
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedScreen() {
  // ============================================
  // HOOKS
  // ============================================
  
  const { user, signOut } = useAuth();

  // ============================================
  // HANDLERS
  // ============================================

  /**
   * Handle Logout
   * Confirmation dialog antes de fazer logout
   */
  function handleLogout() {
    Alert.alert(
      'Confirmar Logout',
      'Você tem certeza que deseja sair?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut();
              // Navegação automática é feita pelo Navigation.tsx
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível fazer logout');
            }
          },
        },
      ]
    );
  }

  /**
   * Simula ação que requer permissão de admin
   */
  function handleAdminAction() {
    if (user?.role !== 'admin') {
      Alert.alert(
        'Acesso Negado',
        'Esta ação requer permissões de administrador.',
        [{ text: 'OK' }]
      );
      return;
    }

    Alert.alert(
      'Sucesso',
      'Ação de administrador executada com sucesso!',
      [{ text: 'OK' }]
    );
  }

  // ============================================
  // RENDER
  // ============================================

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.icon}>🛡️</Text>
        <Text style={styles.title}>Área Protegida</Text>
        <Text style={styles.subtitle}>
          Apenas usuários autenticados podem acessar esta tela
        </Text>
      </View>

      {/* User Info Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>👤 Informações do Usuário</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Nome:</Text>
          <Text style={styles.infoValue}>{user?.name}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email:</Text>
          <Text style={styles.infoValue}>{user?.email}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>ID:</Text>
          <Text style={styles.infoValue}>{user?.id}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Role:</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>
              {user?.role === 'admin' ? '👑 Admin' : '👤 Usuário'}
            </Text>
          </View>
        </View>
      </View>

      {/* Authorization Example */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🔒 Exemplo de Autorização</Text>
        <Text style={styles.cardDescription}>
          Esta ação só pode ser executada por administradores
        </Text>

        <TouchableOpacity
          style={styles.adminButton}
          onPress={handleAdminAction}
        >
          <Text style={styles.adminButtonText}>
            Executar Ação de Admin
          </Text>
        </TouchableOpacity>

        {user?.role !== 'admin' && (
          <Text style={styles.warningText}>
            ⚠️ Você não tem permissão de administrador
          </Text>
        )}
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutButtonText}>🚪 Sair</Text>
      </TouchableOpacity>

      {/* Concepts */}
      <View style={styles.concepts}>
        <Text style={styles.conceptsTitle}>📚 Conceitos Demonstrados:</Text>
        <Text style={styles.conceptText}>
          • Tela protegida (apenas autenticados){'\n'}
          • Exibição de dados do usuário{'\n'}
          • Autorização baseada em roles{'\n'}
          • Logout com confirmação{'\n'}
          • Navegação condicional{'\n'}
          • Alert dialogs
        </Text>
      </View>

      {/* Technical Notes */}
      <View style={styles.technicalNotes}>
        <Text style={styles.notesTitle}>🔧 Notas Técnicas</Text>
        
        <Text style={styles.notesSection}>
          <Text style={styles.notesBold}>Proteção de Rotas:{'\n'}</Text>
          A proteção é implementada no Navigation.tsx usando navegação
          condicional baseada em isAuthenticated.
        </Text>

        <Text style={styles.notesSection}>
          <Text style={styles.notesBold}>Autorização:{'\n'}</Text>
          A verificação de role (user vs admin) é feita no componente.
          Em produção, também deve ser validada no backend!
        </Text>

        <Text style={styles.notesSection}>
          <Text style={styles.notesBold}>Dados do Usuário:{'\n'}</Text>
          Acessados via useAuth() hook que consome o AuthContext.
        </Text>

        <Text style={styles.notesSection}>
          <Text style={styles.notesBold}>Logout:{'\n'}</Text>
          Remove dados do AsyncStorage e atualiza o estado global.
          A navegação para tela de login é automática.
        </Text>
      </View>
    </ScrollView>
  );
}

// ============================================
// STYLES
// ============================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  icon: {
    fontSize: 64,
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
  },
  roleBadge: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  roleText: {
    fontSize: 14,
    color: '#1976d2',
    fontWeight: '600',
  },
  adminButton: {
    backgroundColor: '#ff9800',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  adminButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  warningText: {
    fontSize: 12,
    color: '#f57c00',
    textAlign: 'center',
    marginTop: 8,
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  concepts: {
    backgroundColor: '#fff',
    margin: 16,
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
  technicalNotes: {
    backgroundColor: '#f8f9fa',
    margin: 16,
    marginBottom: 32,
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  notesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  notesSection: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  notesBold: {
    fontWeight: 'bold',
    color: '#333',
  },
});

/**
 * ====================================================================
 * 💡 DICAS DE AUTORIZAÇÃO EM PRODUÇÃO
 * ====================================================================
 * 
 * 1. RBAC (Role-Based Access Control)
 *    - Defina roles claros: admin, user, moderator, etc.
 *    - Crie um sistema de permissões granular
 *    - Exemplo: { users: ['read', 'write'], posts: ['read'] }
 * 
 * 2. VALIDAÇÃO DUPLA
 *    - Frontend: Esconde UI de funcionalidades sem permissão
 *    - Backend: SEMPRE valida permissões nas requisições
 *    - NUNCA confie apenas na validação do frontend!
 * 
 * 3. HELPER FUNCTIONS
 *    - Crie hooks customizados: usePermission('admin')
 *    - Use Higher-Order Components para proteção
 *    - Exemplo: withAuth(Component)
 * 
 * 4. GRANULARIDADE
 *    - Não use apenas admin/user
 *    - Implemente permissões por recurso
 *    - Exemplo: canEditPost, canDeleteUser, etc.
 * 
 * 5. AUDIT LOG
 *    - Registre ações sensíveis
 *    - Mantenha histórico de permissões
 *    - Útil para compliance e segurança
 */
