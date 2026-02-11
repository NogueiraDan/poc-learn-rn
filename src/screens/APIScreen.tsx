/**
 * ====================================================================
 * 🌐 API SCREEN - Integração com APIs em React Native
 * ====================================================================
 * 
 * CONCEITOS DEMONSTRADOS:
 * 
 * 1. Fetch API - Mesma API do navegador
 * 2. Estados de Loading, Error e Success
 * 3. Tratamento de Erros
 * 4. AbortController - Cancelamento de requisições
 * 5. Custom Hooks para chamadas de API
 * 
 * IMPORTANTE:
 * - React Native usa a mesma Fetch API do navegador
 * - Para projetos maiores, considere usar Axios ou React Query
 * - Sempre trate erros e mostre feedback ao usuário
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Post } from '../types';

// URL base da API de teste
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// ============================================
// CUSTOM HOOK: useFetch
// ============================================
// Este é um exemplo de hook customizado reutilizável
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // AbortController permite cancelar requisições
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // Timeout de 10s

      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          setError('Requisição cancelada (timeout)');
        } else {
          setError(err.message);
        }
      } else {
        setError('Erro desconhecido');
      }
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

export default function APIScreen() {
  // Estado para controlar qual demonstração está ativa
  const [activeDemo, setActiveDemo] = useState<'basic' | 'crud'>('basic');

  // ============================================
  // DEMO BÁSICA - Usando o hook customizado
  // ============================================
  const { 
    data: posts, 
    loading, 
    error, 
    refetch 
  } = useFetch<Post[]>(`${API_BASE_URL}/posts?_limit=10`);

  // ============================================
  // DEMO CRUD - Estados separados
  // ============================================
  const [crudLoading, setCrudLoading] = useState(false);
  const [crudResult, setCrudResult] = useState<string | null>(null);

  // POST - Criar um novo recurso
  const handleCreate = async () => {
    setCrudLoading(true);
    setCrudResult(null);

    try {
      const response = await fetch(`${API_BASE_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Novo Post',
          body: 'Conteúdo do post criado via React Native',
          userId: 1,
        }),
      });

      const data = await response.json();
      setCrudResult(`✅ POST criado com ID: ${data.id}`);
    } catch (err) {
      setCrudResult('❌ Erro ao criar post');
    } finally {
      setCrudLoading(false);
    }
  };

  // PUT - Atualizar um recurso
  const handleUpdate = async () => {
    setCrudLoading(true);
    setCrudResult(null);

    try {
      const response = await fetch(`${API_BASE_URL}/posts/1`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: 1,
          title: 'Post Atualizado',
          body: 'Conteúdo atualizado',
          userId: 1,
        }),
      });

      const data = await response.json();
      setCrudResult(`✅ POST ${data.id} atualizado`);
    } catch (err) {
      setCrudResult('❌ Erro ao atualizar post');
    } finally {
      setCrudLoading(false);
    }
  };

  // PATCH - Atualizar parcialmente
  const handlePatch = async () => {
    setCrudLoading(true);
    setCrudResult(null);

    try {
      const response = await fetch(`${API_BASE_URL}/posts/1`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Apenas título atualizado',
        }),
      });

      const data = await response.json();
      setCrudResult(`✅ POST ${data.id} parcialmente atualizado`);
    } catch (err) {
      setCrudResult('❌ Erro ao fazer PATCH');
    } finally {
      setCrudLoading(false);
    }
  };

  // DELETE - Remover um recurso
  const handleDelete = async () => {
    setCrudLoading(true);
    setCrudResult(null);

    try {
      await fetch(`${API_BASE_URL}/posts/1`, {
        method: 'DELETE',
      });

      setCrudResult('✅ POST deletado com sucesso');
    } catch (err) {
      setCrudResult('❌ Erro ao deletar post');
    } finally {
      setCrudLoading(false);
    }
  };

  // Render item da lista
  const renderPost = ({ item }: { item: Post }) => (
    <View style={styles.postCard}>
      <Text style={styles.postId}>#{item.id}</Text>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postBody} numberOfLines={2}>
        {item.body}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeDemo === 'basic' && styles.tabActive]}
          onPress={() => setActiveDemo('basic')}
        >
          <Text style={[styles.tabText, activeDemo === 'basic' && styles.tabTextActive]}>
            GET + Lista
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeDemo === 'crud' && styles.tabActive]}
          onPress={() => setActiveDemo('crud')}
        >
          <Text style={[styles.tabText, activeDemo === 'crud' && styles.tabTextActive]}>
            CRUD
          </Text>
        </TouchableOpacity>
      </View>

      {/* Demo Básica - GET + Lista */}
      {activeDemo === 'basic' && (
        <View style={styles.content}>
          {/* Info Box */}
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>📡 Fetch API</Text>
            <Text style={styles.infoText}>
              Buscando posts de jsonplaceholder.typicode.com{'\n'}
              Pull to refresh para recarregar
            </Text>
          </View>

          {/* Estados: Loading, Error, Success */}
          {loading && !posts ? (
            <View style={styles.centerContainer}>
              <ActivityIndicator size="large" color="#3498db" />
              <Text style={styles.loadingText}>Carregando posts...</Text>
            </View>
          ) : error ? (
            <View style={styles.centerContainer}>
              <Text style={styles.errorEmoji}>⚠️</Text>
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity style={styles.retryButton} onPress={refetch}>
                <Text style={styles.retryButtonText}>Tentar Novamente</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <FlatList
              data={posts}
              renderItem={renderPost}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.listContent}
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={refetch}
                  colors={['#3498db']}
                  tintColor="#3498db"
                />
              }
              ListHeaderComponent={() => (
                <Text style={styles.listHeader}>
                  📋 {posts?.length || 0} posts carregados
                </Text>
              )}
            />
          )}
        </View>
      )}

      {/* Demo CRUD */}
      {activeDemo === 'crud' && (
        <View style={styles.crudContent}>
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>🔄 Operações CRUD</Text>
            <Text style={styles.infoText}>
              Teste as operações POST, PUT, PATCH e DELETE{'\n'}
              (API de teste - dados não persistem)
            </Text>
          </View>

          {/* Botões CRUD */}
          <View style={styles.crudButtons}>
            <TouchableOpacity
              style={[styles.crudButton, styles.crudButtonPost]}
              onPress={handleCreate}
              disabled={crudLoading}
            >
              <Text style={styles.crudButtonText}>POST</Text>
              <Text style={styles.crudButtonSubtext}>Criar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.crudButton, styles.crudButtonPut]}
              onPress={handleUpdate}
              disabled={crudLoading}
            >
              <Text style={styles.crudButtonText}>PUT</Text>
              <Text style={styles.crudButtonSubtext}>Atualizar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.crudButton, styles.crudButtonPatch]}
              onPress={handlePatch}
              disabled={crudLoading}
            >
              <Text style={styles.crudButtonText}>PATCH</Text>
              <Text style={styles.crudButtonSubtext}>Parcial</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.crudButton, styles.crudButtonDelete]}
              onPress={handleDelete}
              disabled={crudLoading}
            >
              <Text style={styles.crudButtonText}>DELETE</Text>
              <Text style={styles.crudButtonSubtext}>Remover</Text>
            </TouchableOpacity>
          </View>

          {/* Resultado */}
          <View style={styles.resultBox}>
            {crudLoading ? (
              <ActivityIndicator size="small" color="#3498db" />
            ) : crudResult ? (
              <Text style={styles.resultText}>{crudResult}</Text>
            ) : (
              <Text style={styles.resultPlaceholder}>
                Clique em um botão para testar
              </Text>
            )}
          </View>

          {/* Código de Exemplo */}
          <View style={styles.codeBlock}>
            <Text style={styles.codeTitle}>💻 Exemplo de POST com Fetch</Text>
            <Text style={styles.codeText}>
              {`const createPost = async (data) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Erro na requisição');
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Erro:', error);
    throw error;
  }
};`}
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#ecf0f1',
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#3498db',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7f8c8d',
  },
  tabTextActive: {
    color: '#ffffff',
  },
  content: {
    flex: 1,
  },
  infoBox: {
    margin: 16,
    marginBottom: 8,
    backgroundColor: '#e8f4f8',
    borderRadius: 12,
    padding: 12,
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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#7f8c8d',
  },
  errorEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  errorText: {
    fontSize: 14,
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  listHeader: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7f8c8d',
    marginBottom: 12,
  },
  postCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  postId: {
    fontSize: 12,
    color: '#3498db',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  postTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 6,
    textTransform: 'capitalize',
  },
  postBody: {
    fontSize: 13,
    color: '#7f8c8d',
    lineHeight: 18,
  },
  crudContent: {
    flex: 1,
    padding: 16,
  },
  crudButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  crudButton: {
    flex: 1,
    minWidth: '45%',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  crudButtonPost: {
    backgroundColor: '#2ecc71',
  },
  crudButtonPut: {
    backgroundColor: '#3498db',
  },
  crudButtonPatch: {
    backgroundColor: '#f39c12',
  },
  crudButtonDelete: {
    backgroundColor: '#e74c3c',
  },
  crudButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  crudButtonSubtext: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 11,
    marginTop: 2,
  },
  resultBox: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    minHeight: 80,
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  resultPlaceholder: {
    fontSize: 14,
    color: '#95a5a6',
  },
  codeBlock: {
    backgroundColor: '#2c3e50',
    borderRadius: 12,
    padding: 16,
    flex: 1,
  },
  codeTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#f1c40f',
    marginBottom: 12,
  },
  codeText: {
    fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace' }),
    fontSize: 10,
    color: '#ecf0f1',
    lineHeight: 16,
  },
});
