/**
 * ====================================================================
 * 💾 STORAGE SCREEN - Armazenamento Local com AsyncStorage
 * ====================================================================
 * 
 * CONCEITOS DEMONSTRADOS:
 * 
 * 1. AsyncStorage - Armazenamento persistente de dados (key-value)
 * 2. CRUD de dados locais
 * 3. Serialização/Deserialização de objetos (JSON)
 * 4. Boas práticas de armazenamento
 * 
 * IMPORTANTE:
 * - AsyncStorage é ASSÍNCRONO (todas operações são async/await)
 * - Armazena apenas STRINGS (use JSON.stringify/parse para objetos)
 * - Limite de ~6MB no Android e sem limite específico no iOS
 * - Para dados complexos, considere SQLite ou Realm
 * - NÃO use para dados sensíveis (use expo-secure-store)
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StoredItem } from '../types';

// Chave para armazenamento - use prefixos para organizar
const STORAGE_KEY = '@poc_learn_rn:items';

export default function StorageScreen() {
  // Estados
  const [items, setItems] = useState<StoredItem[]>([]);
  const [newItemText, setNewItemText] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ============================================
  // CARREGAR DADOS AO INICIAR
  // ============================================
  useEffect(() => {
    loadItems();
  }, []);

  // ============================================
  // FUNÇÕES DE ARMAZENAMENTO
  // ============================================

  // Carregar itens do AsyncStorage
  const loadItems = async () => {
    try {
      setLoading(true);
      
      // getItem retorna string ou null
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      
      if (storedData !== null) {
        // Parse do JSON para objeto
        const parsedItems: StoredItem[] = JSON.parse(storedData);
        setItems(parsedItems);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      Alert.alert('Erro', 'Não foi possível carregar os dados salvos');
    } finally {
      setLoading(false);
    }
  };

  // Salvar itens no AsyncStorage
  const saveItems = async (newItems: StoredItem[]) => {
    try {
      setSaving(true);
      
      // Converter para JSON string
      const jsonValue = JSON.stringify(newItems);
      
      // Salvar no AsyncStorage
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
      
      setItems(newItems);
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      Alert.alert('Erro', 'Não foi possível salvar os dados');
    } finally {
      setSaving(false);
    }
  };

  // Adicionar novo item
  const handleAddItem = async () => {
    if (!newItemText.trim()) {
      Alert.alert('Atenção', 'Digite algo para adicionar');
      return;
    }

    const newItem: StoredItem = {
      id: Date.now().toString(), // ID único baseado em timestamp
      text: newItemText.trim(),
      createdAt: new Date().toISOString(),
    };

    const updatedItems = [newItem, ...items];
    await saveItems(updatedItems);
    setNewItemText('');
  };

  // Remover item
  const handleRemoveItem = async (id: string) => {
    Alert.alert(
      'Confirmar',
      'Deseja remover este item?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: async () => {
            const updatedItems = items.filter(item => item.id !== id);
            await saveItems(updatedItems);
          },
        },
      ]
    );
  };

  // Limpar todos os dados
  const handleClearAll = async () => {
    if (items.length === 0) {
      Alert.alert('Info', 'Não há itens para limpar');
      return;
    }

    Alert.alert(
      'Limpar Tudo',
      'Deseja remover TODOS os itens salvos?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Limpar',
          style: 'destructive',
          onPress: async () => {
            try {
              // Remove a chave do storage
              await AsyncStorage.removeItem(STORAGE_KEY);
              setItems([]);
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível limpar os dados');
            }
          },
        },
      ]
    );
  };

  // Formatar data
  const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Render item da lista
  const renderItem = useCallback(({ item }: { item: StoredItem }) => (
    <View style={styles.itemCard}>
      <View style={styles.itemContent}>
        <Text style={styles.itemText}>{item.text}</Text>
        <Text style={styles.itemDate}>{formatDate(item.createdAt)}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleRemoveItem(item.id)}
      >
        <Text style={styles.deleteButtonText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  ), [items]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Carregando dados...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {/* Header Info */}
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>💾 AsyncStorage</Text>
        <Text style={styles.infoText}>
          Armazenamento local persistente (key-value){'\n'}
          Os dados são mantidos mesmo após fechar o app
        </Text>
      </View>

      {/* Input para novo item */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite algo para salvar..."
          placeholderTextColor="#95a5a6"
          value={newItemText}
          onChangeText={setNewItemText}
          onSubmitEditing={handleAddItem}
          returnKeyType="done"
        />
        <TouchableOpacity
          style={[styles.addButton, saving && styles.addButtonDisabled]}
          onPress={handleAddItem}
          disabled={saving}
        >
          <Text style={styles.addButtonText}>
            {saving ? '...' : '+'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Lista de itens */}
      <View style={styles.listContainer}>
        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>
            📋 Itens Salvos ({items.length})
          </Text>
          {items.length > 0 && (
            <TouchableOpacity onPress={handleClearAll}>
              <Text style={styles.clearAllText}>Limpar Tudo</Text>
            </TouchableOpacity>
          )}
        </View>

        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyEmoji}>📝</Text>
              <Text style={styles.emptyText}>Nenhum item salvo</Text>
              <Text style={styles.emptySubtext}>
                Adicione algo acima para testar
              </Text>
            </View>
          )}
        />
      </View>

      {/* Código de Exemplo */}
      <View style={styles.codeBlock}>
        <Text style={styles.codeTitle}>💻 Métodos do AsyncStorage</Text>
        <Text style={styles.codeText}>
          {`// Salvar (string)
await AsyncStorage.setItem('@key', 'valor');

// Salvar (objeto)
await AsyncStorage.setItem('@key', JSON.stringify(obj));

// Ler
const value = await AsyncStorage.getItem('@key');
const obj = JSON.parse(value);

// Remover
await AsyncStorage.removeItem('@key');

// Limpar TUDO (cuidado!)
await AsyncStorage.clear();

// Pegar todas as chaves
const keys = await AsyncStorage.getAllKeys();

// Múltiplas operações
await AsyncStorage.multiSet([['@k1', 'v1'], ['@k2', 'v2']]);
await AsyncStorage.multiGet(['@k1', '@k2']);
await AsyncStorage.multiRemove(['@k1', '@k2']);`}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f6fa',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#7f8c8d',
  },
  infoBox: {
    margin: 16,
    marginBottom: 12,
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
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 12,
    gap: 12,
  },
  input: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#2c3e50',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  addButton: {
    width: 50,
    height: 50,
    backgroundColor: '#3498db',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  addButtonDisabled: {
    backgroundColor: '#95a5a6',
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  clearAllText: {
    fontSize: 13,
    color: '#e74c3c',
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 8,
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  itemContent: {
    flex: 1,
  },
  itemText: {
    fontSize: 15,
    color: '#2c3e50',
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 11,
    color: '#95a5a6',
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },
  deleteButtonText: {
    fontSize: 18,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7f8c8d',
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 13,
    color: '#95a5a6',
  },
  codeBlock: {
    margin: 16,
    marginTop: 8,
    backgroundColor: '#2c3e50',
    borderRadius: 12,
    padding: 14,
    maxHeight: 200,
  },
  codeTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#f1c40f',
    marginBottom: 10,
  },
  codeText: {
    fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace' }),
    fontSize: 10,
    color: '#ecf0f1',
    lineHeight: 15,
  },
});
