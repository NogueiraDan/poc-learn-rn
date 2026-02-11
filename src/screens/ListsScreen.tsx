/**
 * ====================================================================
 * 📋 LISTS SCREEN - Listas Otimizadas em React Native
 * ====================================================================
 * 
 * CONCEITOS DEMONSTRADOS:
 * 
 * 1. FlatList - Lista virtualizadas (mais performática que map em ScrollView)
 * 2. SectionList - Lista com seções/headers
 * 3. Pull to Refresh - Atualização puxando para baixo
 * 4. Infinite Scroll - Carregar mais itens ao chegar no fim
 * 5. Otimização de Performance
 * 
 * IMPORTANTE:
 * - NUNCA use .map() dentro de ScrollView para listas grandes
 * - FlatList renderiza apenas itens visíveis (virtualização)
 * - Sempre use keyExtractor para identificar itens únicos
 * - Use getItemLayout se todos os itens têm a mesma altura
 */

import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  SectionList,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Tipos
interface Contact {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface Section {
  title: string;
  data: Contact[];
}

// Função para gerar dados mockados
const generateContacts = (start: number, count: number): Contact[] => {
  const names = [
    'Ana Silva', 'Bruno Costa', 'Carlos Souza', 'Diana Lima',
    'Eduardo Santos', 'Fernanda Oliveira', 'Gabriel Pereira', 'Helena Alves',
    'Igor Ribeiro', 'Julia Martins', 'Kevin Rodrigues', 'Laura Ferreira',
  ];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `contact-${start + i}`,
    name: names[(start + i) % names.length] + ` ${start + i}`,
    email: `contato${start + i}@email.com`,
    avatar: ['🧑', '👩', '👨', '👧', '🧔', '👱'][(start + i) % 6],
  }));
};

// Dados para SectionList (organizados por letra)
const generateSectionData = (): Section[] => {
  const allContacts = generateContacts(0, 26);
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  
  return letters.slice(0, 5).map((letter, index) => ({
    title: letter,
    data: allContacts.slice(index * 3, index * 3 + 3).map(c => ({
      ...c,
      name: `${letter}${c.name.slice(1)}`,
    })),
  }));
};

export default function ListsScreen() {
  // Estado para controlar qual tipo de lista está ativo
  const [activeTab, setActiveTab] = useState<'flatlist' | 'sectionlist'>('flatlist');
  
  // Estados para FlatList com infinite scroll
  const [contacts, setContacts] = useState<Contact[]>(() => generateContacts(0, 20));
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Dados para SectionList
  const sectionData = useMemo(() => generateSectionData(), []);

  // ============================================
  // PULL TO REFRESH
  // ============================================
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    
    // Simula uma chamada de API
    setTimeout(() => {
      setContacts(generateContacts(0, 20));
      setHasMore(true);
      setRefreshing(false);
    }, 1500);
  }, []);

  // ============================================
  // INFINITE SCROLL / LOAD MORE
  // ============================================
  const onEndReached = useCallback(() => {
    if (loadingMore || !hasMore) return;
    
    setLoadingMore(true);
    
    // Simula carregar mais dados
    setTimeout(() => {
      const currentLength = contacts.length;
      const newContacts = generateContacts(currentLength, 10);
      
      setContacts(prev => [...prev, ...newContacts]);
      setLoadingMore(false);
      
      // Simula fim dos dados após 50 itens
      if (currentLength + 10 >= 50) {
        setHasMore(false);
      }
    }, 1000);
  }, [contacts.length, loadingMore, hasMore]);

  // ============================================
  // RENDER ITEM - Componente de cada item da lista
  // ============================================
  // useCallback é importante aqui para evitar re-renders desnecessários
  const renderContactItem = useCallback(({ item, index }: { item: Contact; index: number }) => (
    <TouchableOpacity 
      style={styles.contactItem}
      onPress={() => console.log('Pressed:', item.name)}
      activeOpacity={0.7}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.avatar}</Text>
      </View>
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactEmail}>{item.email}</Text>
      </View>
      <Text style={styles.contactIndex}>#{index + 1}</Text>
    </TouchableOpacity>
  ), []);

  // ============================================
  // KEY EXTRACTOR - Identifica cada item uniquely
  // ============================================
  const keyExtractor = useCallback((item: Contact) => item.id, []);

  // ============================================
  // HEADER DA LISTA
  // ============================================
  const ListHeader = useCallback(() => (
    <View style={styles.listHeader}>
      <Text style={styles.listHeaderTitle}>📋 Lista de Contatos</Text>
      <Text style={styles.listHeaderSubtitle}>
        {contacts.length} contatos carregados
      </Text>
    </View>
  ), [contacts.length]);

  // ============================================
  // FOOTER DA LISTA
  // ============================================
  const ListFooter = useCallback(() => {
    if (!loadingMore && !hasMore) {
      return (
        <View style={styles.listFooter}>
          <Text style={styles.endMessage}>✨ Fim da lista!</Text>
        </View>
      );
    }
    
    if (loadingMore) {
      return (
        <View style={styles.listFooter}>
          <ActivityIndicator size="small" color="#3498db" />
          <Text style={styles.loadingText}>Carregando mais...</Text>
        </View>
      );
    }
    
    return null;
  }, [loadingMore, hasMore]);

  // ============================================
  // EMPTY STATE
  // ============================================
  const EmptyList = useCallback(() => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyEmoji}>📭</Text>
      <Text style={styles.emptyText}>Nenhum contato encontrado</Text>
    </View>
  ), []);

  // ============================================
  // SEPARADOR ENTRE ITENS
  // ============================================
  const ItemSeparator = useCallback(() => (
    <View style={styles.separator} />
  ), []);

  // ============================================
  // SECTION LIST: Header da seção
  // ============================================
  const renderSectionHeader = useCallback(({ section }: { section: Section }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{section.title}</Text>
    </View>
  ), []);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {/* Tabs para alternar entre tipos de lista */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'flatlist' && styles.tabActive]}
          onPress={() => setActiveTab('flatlist')}
        >
          <Text style={[styles.tabText, activeTab === 'flatlist' && styles.tabTextActive]}>
            FlatList
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'sectionlist' && styles.tabActive]}
          onPress={() => setActiveTab('sectionlist')}
        >
          <Text style={[styles.tabText, activeTab === 'sectionlist' && styles.tabTextActive]}>
            SectionList
          </Text>
        </TouchableOpacity>
      </View>

      {/* Info Box */}
      <View style={styles.infoBox}>
        {activeTab === 'flatlist' ? (
          <>
            <Text style={styles.infoTitle}>📱 FlatList</Text>
            <Text style={styles.infoText}>
              • Pull to refresh (puxe para baixo){'\n'}
              • Infinite scroll (role até o fim){'\n'}
              • Renderização virtualizada
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.infoTitle}>📑 SectionList</Text>
            <Text style={styles.infoText}>
              • Organizada por seções (letras){'\n'}
              • Headers fixos por seção{'\n'}
              • Ideal para listas agrupadas
            </Text>
          </>
        )}
      </View>

      {/* FlatList */}
      {activeTab === 'flatlist' && (
        <FlatList
          data={contacts}
          renderItem={renderContactItem}
          keyExtractor={keyExtractor}
          
          // Header e Footer customizados
          ListHeaderComponent={ListHeader}
          ListFooterComponent={ListFooter}
          ListEmptyComponent={EmptyList}
          
          // Separador entre itens
          ItemSeparatorComponent={ItemSeparator}
          
          // Pull to Refresh
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#3498db']} // Android
              tintColor="#3498db" // iOS
              title="Atualizando..." // iOS only
            />
          }
          
          // Infinite Scroll
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5} // Dispara quando 50% do final está visível
          
          // Performance optimizations
          removeClippedSubviews={true} // Remove views fora da tela (Android)
          maxToRenderPerBatch={10} // Número de itens renderizados por batch
          windowSize={10} // Número de "telas" mantidas em memória
          initialNumToRender={10} // Itens renderizados inicialmente
          
          // Se todos os itens têm a mesma altura, use getItemLayout
          // getItemLayout={(data, index) => ({
          //   length: 76, // altura do item
          //   offset: 76 * index,
          //   index,
          // })}
          
          showsVerticalScrollIndicator={true}
          contentContainerStyle={styles.listContent}
          style={styles.list}
        />
      )}

      {/* SectionList */}
      {activeTab === 'sectionlist' && (
        <SectionList
          sections={sectionData}
          renderItem={renderContactItem}
          renderSectionHeader={renderSectionHeader}
          keyExtractor={keyExtractor}
          
          // Sticky section headers
          stickySectionHeadersEnabled={true}
          
          // Separadores
          ItemSeparatorComponent={ItemSeparator}
          SectionSeparatorComponent={() => <View style={styles.sectionSeparator} />}
          
          // Performance
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          
          showsVerticalScrollIndicator={true}
          contentContainerStyle={styles.listContent}
          style={styles.list}
        />
      )}

      {/* Code Example */}
      <View style={styles.codeContainer}>
        <Text style={styles.codeTitle}>💡 Dica de Performance</Text>
        <Text style={styles.codeText}>
          {activeTab === 'flatlist'
            ? 'Use React.memo() nos componentes de item para evitar re-renders'
            : 'stickySectionHeadersEnabled mantém headers visíveis ao scrollar'}
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
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  listHeader: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
    marginBottom: 8,
  },
  listHeaderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  listHeaderSubtitle: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 2,
  },
  listFooter: {
    paddingVertical: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  loadingText: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  endMessage: {
    fontSize: 14,
    color: '#2ecc71',
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  separator: {
    height: 1,
    backgroundColor: '#ecf0f1',
    marginLeft: 70, // Alinha com o início do texto
  },
  sectionSeparator: {
    height: 8,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 24,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 2,
  },
  contactEmail: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  contactIndex: {
    fontSize: 12,
    color: '#bdc3c7',
    fontWeight: '500',
  },
  sectionHeader: {
    backgroundColor: '#f5f6fa',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginTop: 8,
    marginBottom: 8,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3498db',
  },
  codeContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#2c3e50',
    borderRadius: 8,
    padding: 12,
  },
  codeTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#f1c40f',
    marginBottom: 4,
  },
  codeText: {
    fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace' }),
    fontSize: 11,
    color: '#ecf0f1',
    lineHeight: 16,
  },
});
