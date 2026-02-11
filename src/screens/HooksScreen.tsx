/**
 * ====================================================================
 * 🪝 HOOKS SCREEN - Hooks Essenciais do React
 * ====================================================================
 * 
 * CONCEITOS DEMONSTRADOS:
 * 
 * 1. useState - Estado local do componente
 * 2. useEffect - Efeitos colaterais (lifecycle)
 * 3. useCallback - Memorização de funções
 * 4. useMemo - Memorização de valores computados
 * 5. useRef - Referências mutáveis
 * 6. Custom Hooks - Hooks personalizados
 * 
 * IMPORTANTE:
 * - Todos os hooks do React funcionam igual no React Native
 * - Regras dos Hooks: sempre no topo, sempre na mesma ordem
 * - useCallback e useMemo são essenciais para performance
 */

import React, { 
  useState, 
  useEffect, 
  useCallback, 
  useMemo, 
  useRef 
} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
  AppState,
  AppStateStatus,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// ============================================
// CUSTOM HOOK: useCounter
// ============================================
// Exemplo de hook customizado reutilizável
function useCounter(initialValue: number = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = useCallback(() => setCount(c => c + 1), []);
  const decrement = useCallback(() => setCount(c => c - 1), []);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);
  
  return { count, increment, decrement, reset };
}

// ============================================
// CUSTOM HOOK: useAppState
// ============================================
// Hook para monitorar estado do app (foreground/background)
function useAppState() {
  const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);
  
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextState) => {
      setAppState(nextState);
    });
    
    // Cleanup: sempre limpe subscriptions no return do useEffect
    return () => {
      subscription.remove();
    };
  }, []);
  
  return appState;
}

// ============================================
// CUSTOM HOOK: useDebounce
// ============================================
// Hook para debounce de valores (útil para busca)
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  
  return debouncedValue;
}

export default function HooksScreen() {
  // ============================================
  // 1. useState - Estado básico
  // ============================================
  const [name, setName] = useState('');
  const [activeSection, setActiveSection] = useState<number>(1);
  
  // Usando Custom Hook
  const counter = useCounter(0);
  const appState = useAppState();
  
  // ============================================
  // 2. useEffect - Efeitos colaterais
  // ============================================
  const [renderCount, setRenderCount] = useState(0);
  
  // Effect que roda em TODA renderização
  useEffect(() => {
    setRenderCount(c => c + 1);
  });
  
  // Effect que roda apenas uma vez (mount)
  useEffect(() => {
    console.log('Componente montado!');
    
    // Cleanup function - roda no unmount
    return () => {
      console.log('Componente desmontado!');
    };
  }, []); // Array vazio = apenas no mount
  
  // Effect que roda quando 'name' muda
  useEffect(() => {
    if (name) {
      console.log('Nome alterado para:', name);
    }
  }, [name]); // Dependência específica
  
  // ============================================
  // 3. useCallback - Memorização de funções
  // ============================================
  // SEM useCallback: função recriada a cada render
  const handlePressWithoutCallback = () => {
    console.log('Função recriada a cada render');
  };
  
  // COM useCallback: função memorizada
  const handlePressWithCallback = useCallback(() => {
    console.log('Função memorizada');
  }, []); // Só recria se dependências mudarem
  
  // ============================================
  // 4. useMemo - Memorização de valores
  // ============================================
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  
  // Cálculo "pesado" memorizado
  const expensiveCalculation = useMemo(() => {
    console.log('Calculando soma...');
    return numbers.reduce((acc, num) => acc + num, 0);
  }, [numbers]); // Só recalcula se 'numbers' mudar
  
  // Filtro de números pares (memorizado)
  const evenNumbers = useMemo(() => {
    return numbers.filter(n => n % 2 === 0);
  }, [numbers]);
  
  // ============================================
  // 5. useRef - Referência mutável
  // ============================================
  const inputRef = useRef<TextInput>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const previousNameRef = useRef<string>('');
  
  // Guardar valor anterior
  useEffect(() => {
    previousNameRef.current = name;
  }, [name]);
  
  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);
  
  // ============================================
  // 6. useDebounce - Custom Hook
  // ============================================
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  
  useEffect(() => {
    if (debouncedSearch) {
      console.log('Buscando:', debouncedSearch);
      // Aqui faria a chamada para API
    }
  }, [debouncedSearch]);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Status do App */}
        <View style={styles.statusBar}>
          <Text style={styles.statusText}>
            📱 App: {appState} | 🔄 Renders: {renderCount}
          </Text>
        </View>

        {/* ============================================
            SEÇÃO 1: useState
            ============================================ */}
        <TouchableOpacity 
          style={styles.section}
          onPress={() => setActiveSection(activeSection === 1 ? 0 : 1)}
          activeOpacity={0.9}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🔵 useState</Text>
            <Text style={styles.expandIcon}>
              {activeSection === 1 ? '▼' : '▶'}
            </Text>
          </View>
          
          {activeSection === 1 && (
            <View style={styles.sectionContent}>
              <Text style={styles.description}>
                Estado local do componente. Causa re-render quando alterado.
              </Text>
              
              {/* Counter com Custom Hook */}
              <View style={styles.counterContainer}>
                <TouchableOpacity 
                  style={styles.counterButton}
                  onPress={counter.decrement}
                >
                  <Text style={styles.counterButtonText}>-</Text>
                </TouchableOpacity>
                
                <Text style={styles.counterValue}>{counter.count}</Text>
                
                <TouchableOpacity 
                  style={styles.counterButton}
                  onPress={counter.increment}
                >
                  <Text style={styles.counterButtonText}>+</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.resetButton}
                  onPress={counter.reset}
                >
                  <Text style={styles.resetButtonText}>Reset</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.codeBlock}>
                <Text style={styles.codeText}>
                  {`const [count, setCount] = useState(0);

// Atualização direta
setCount(5);

// Atualização baseada no valor anterior
setCount(prev => prev + 1);`}
                </Text>
              </View>
            </View>
          )}
        </TouchableOpacity>

        {/* ============================================
            SEÇÃO 2: useEffect
            ============================================ */}
        <TouchableOpacity 
          style={styles.section}
          onPress={() => setActiveSection(activeSection === 2 ? 0 : 2)}
          activeOpacity={0.9}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🟡 useEffect</Text>
            <Text style={styles.expandIcon}>
              {activeSection === 2 ? '▼' : '▶'}
            </Text>
          </View>
          
          {activeSection === 2 && (
            <View style={styles.sectionContent}>
              <Text style={styles.description}>
                Efeitos colaterais: API calls, subscriptions, DOM updates.
              </Text>
              
              <View style={styles.codeBlock}>
                <Text style={styles.codeText}>
                  {`// Roda em TODA renderização
useEffect(() => {
  console.log('Renderizou');
});

// Roda apenas uma vez (mount)
useEffect(() => {
  console.log('Montou');
  return () => console.log('Desmontou');
}, []);

// Roda quando dependência muda
useEffect(() => {
  console.log('Nome:', name);
}, [name]);`}
                </Text>
              </View>
            </View>
          )}
        </TouchableOpacity>

        {/* ============================================
            SEÇÃO 3: useCallback
            ============================================ */}
        <TouchableOpacity 
          style={styles.section}
          onPress={() => setActiveSection(activeSection === 3 ? 0 : 3)}
          activeOpacity={0.9}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🟢 useCallback</Text>
            <Text style={styles.expandIcon}>
              {activeSection === 3 ? '▼' : '▶'}
            </Text>
          </View>
          
          {activeSection === 3 && (
            <View style={styles.sectionContent}>
              <Text style={styles.description}>
                Memoriza funções para evitar recriação a cada render.
                Essencial para otimizar componentes filhos.
              </Text>
              
              <View style={styles.codeBlock}>
                <Text style={styles.codeText}>
                  {`// SEM useCallback - recria toda hora
const handlePress = () => {
  doSomething();
};

// COM useCallback - memorizada
const handlePress = useCallback(() => {
  doSomething(id);
}, [id]); // Recria só se 'id' mudar

// Importante para:
// - Props de componentes memorizados
// - Dependências de outros hooks`}
                </Text>
              </View>
            </View>
          )}
        </TouchableOpacity>

        {/* ============================================
            SEÇÃO 4: useMemo
            ============================================ */}
        <TouchableOpacity 
          style={styles.section}
          onPress={() => setActiveSection(activeSection === 4 ? 0 : 4)}
          activeOpacity={0.9}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🔴 useMemo</Text>
            <Text style={styles.expandIcon}>
              {activeSection === 4 ? '▼' : '▶'}
            </Text>
          </View>
          
          {activeSection === 4 && (
            <View style={styles.sectionContent}>
              <Text style={styles.description}>
                Memoriza valores computados. Evita recálculos desnecessários.
              </Text>
              
              <View style={styles.memoExample}>
                <Text style={styles.memoLabel}>
                  Soma de {numbers.length} números:
                </Text>
                <Text style={styles.memoValue}>{expensiveCalculation}</Text>
                
                <Text style={styles.memoLabel}>Números pares:</Text>
                <Text style={styles.memoValue}>{evenNumbers.join(', ')}</Text>
              </View>
              
              <View style={styles.codeBlock}>
                <Text style={styles.codeText}>
                  {`// Cálculo pesado memorizado
const result = useMemo(() => {
  return data.filter(x => x.active)
             .map(x => x.value)
             .reduce((a, b) => a + b, 0);
}, [data]); // Recalcula só se 'data' mudar

// Use quando:
// - Cálculos/filtragens pesadas
// - Objetos/arrays para dependências`}
                </Text>
              </View>
            </View>
          )}
        </TouchableOpacity>

        {/* ============================================
            SEÇÃO 5: useRef
            ============================================ */}
        <TouchableOpacity 
          style={styles.section}
          onPress={() => setActiveSection(activeSection === 5 ? 0 : 5)}
          activeOpacity={0.9}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🟣 useRef</Text>
            <Text style={styles.expandIcon}>
              {activeSection === 5 ? '▼' : '▶'}
            </Text>
          </View>
          
          {activeSection === 5 && (
            <View style={styles.sectionContent}>
              <Text style={styles.description}>
                Referência mutável que persiste entre renders.
                Não causa re-render quando alterada.
              </Text>
              
              <View style={styles.refExample}>
                <TextInput
                  ref={inputRef}
                  style={styles.refInput}
                  placeholder="Input com ref"
                  placeholderTextColor="#95a5a6"
                  value={name}
                  onChangeText={setName}
                />
                <TouchableOpacity 
                  style={styles.focusButton}
                  onPress={focusInput}
                >
                  <Text style={styles.focusButtonText}>Focar Input</Text>
                </TouchableOpacity>
                
                {previousNameRef.current && name !== previousNameRef.current && (
                  <Text style={styles.previousValue}>
                    Valor anterior: {previousNameRef.current}
                  </Text>
                )}
              </View>
              
              <View style={styles.codeBlock}>
                <Text style={styles.codeText}>
                  {`// Referência para elementos
const inputRef = useRef<TextInput>(null);
inputRef.current?.focus();

// Guardar valores sem re-render
const timerRef = useRef<number | null>(null);
timerRef.current = setTimeout(...);

// Guardar valor anterior
const prevRef = useRef(value);
useEffect(() => {
  prevRef.current = value;
}, [value]);`}
                </Text>
              </View>
            </View>
          )}
        </TouchableOpacity>

        {/* ============================================
            SEÇÃO 6: Custom Hooks
            ============================================ */}
        <TouchableOpacity 
          style={styles.section}
          onPress={() => setActiveSection(activeSection === 6 ? 0 : 6)}
          activeOpacity={0.9}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🟠 Custom Hooks</Text>
            <Text style={styles.expandIcon}>
              {activeSection === 6 ? '▼' : '▶'}
            </Text>
          </View>
          
          {activeSection === 6 && (
            <View style={styles.sectionContent}>
              <Text style={styles.description}>
                Extraia lógica reutilizável em hooks customizados.
              </Text>
              
              {/* Demo do useDebounce */}
              <View style={styles.debounceExample}>
                <Text style={styles.debounceLabel}>useDebounce Demo:</Text>
                <TextInput
                  style={styles.debounceInput}
                  placeholder="Digite para buscar (500ms debounce)"
                  placeholderTextColor="#95a5a6"
                  value={searchTerm}
                  onChangeText={setSearchTerm}
                />
                <Text style={styles.debounceResult}>
                  Buscando: {debouncedSearch || '(aguardando...)'}
                </Text>
              </View>
              
              <View style={styles.codeBlock}>
                <Text style={styles.codeText}>
                  {`// Custom Hook: useDebounce
function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  
  return debounced;
}

// Uso
const debouncedSearch = useDebounce(search, 500);`}
                </Text>
              </View>
            </View>
          )}
        </TouchableOpacity>

        {/* Espaço extra */}
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
  statusBar: {
    backgroundColor: '#2c3e50',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 12,
    textAlign: 'center',
    fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace' }),
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  expandIcon: {
    fontSize: 12,
    color: '#95a5a6',
  },
  sectionContent: {
    padding: 16,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
  },
  description: {
    fontSize: 13,
    color: '#7f8c8d',
    lineHeight: 19,
    marginBottom: 12,
  },
  codeBlock: {
    backgroundColor: '#2c3e50',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  codeText: {
    fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace' }),
    fontSize: 10,
    color: '#ecf0f1',
    lineHeight: 16,
  },
  // Counter
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 12,
  },
  counterButton: {
    width: 44,
    height: 44,
    backgroundColor: '#3498db',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterButtonText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  counterValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    minWidth: 60,
    textAlign: 'center',
  },
  resetButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#ecf0f1',
    borderRadius: 8,
  },
  resetButtonText: {
    color: '#7f8c8d',
    fontWeight: '600',
  },
  // Memo example
  memoExample: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  memoLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 4,
  },
  memoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  // Ref example
  refExample: {
    marginBottom: 8,
  },
  refInput: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    marginBottom: 8,
  },
  focusButton: {
    backgroundColor: '#9b59b6',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  focusButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  previousValue: {
    marginTop: 8,
    fontSize: 12,
    color: '#7f8c8d',
    fontStyle: 'italic',
  },
  // Debounce example
  debounceExample: {
    marginBottom: 8,
  },
  debounceLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7f8c8d',
    marginBottom: 8,
  },
  debounceInput: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    marginBottom: 8,
  },
  debounceResult: {
    fontSize: 12,
    color: '#3498db',
    fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace' }),
  },
});
