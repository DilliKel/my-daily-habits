/* eslint-disable react-refresh/only-export-components */
// Arquivos de contexto exportam Provider, context object e hook juntos — padrão React
import { createContext, useContext, useEffect, useState } from 'react'

// createContext fica fora de qualquer componente — cria o canal uma vez
export const HabitsContext = createContext(null)

const initialHabits = [
  {
    id: 1,
    nome: 'Exercício',
    descricao: 'Treino de força',
    categoria: 'Saúde',
    tipo: 'manter',
    cor: '#2563eb',
    meta: 5,
    ativo: true,
    diasFeitos: 5,
    logs: ['Comecei com treino leve', 'Mantive 5 dias na semana'],
  },
  {
    id: 2,
    nome: 'Leitura',
    descricao: 'Livro ou artigo',
    categoria: 'Estudo',
    tipo: 'manter',
    cor: '#059669',
    meta: 7,
    ativo: true,
    diasFeitos: 3,
    logs: ['Leitura noturna de 20 minutos'],
  },
  {
    id: 3,
    nome: 'Rolagem infinita',
    descricao: 'Reduzir tempo de redes sociais',
    categoria: 'Foco',
    tipo: 'parar',
    cor: '#dc2626',
    meta: 7,
    ativo: true,
    diasFeitos: 2,
    logs: ['2 dias sem excesso de redes'],
  },
]

export function HabitsProvider({ children }) {
  const [habits, setHabits] = useState(() => {
    const stored = localStorage.getItem('my-daily-habits')
    if (!stored) return initialHabits
    try {
      const parsed = JSON.parse(stored)
      if (!Array.isArray(parsed)) return initialHabits
      return parsed.map((habit) => ({
        ...habit,
        tipo: habit.tipo || 'manter',
        cor: habit.cor || '#111827',
        logs: Array.isArray(habit.logs) ? habit.logs : [],
      }))
    } catch {
      return initialHabits
    }
  })

  useEffect(() => {
    localStorage.setItem('my-daily-habits', JSON.stringify(habits))
  }, [habits])

  const adicionarHabit = (novoHabit) => {
    setHabits(prev => [...prev, novoHabit])
  }

  const removerHabit = (id) => {
    setHabits(prev => prev.filter(h => h.id !== id))
  }

  const registrarDia = (id) => {
    const dataAtual = new Date().toLocaleDateString('pt-BR')
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h
        return {
          ...h,
          diasFeitos: h.diasFeitos + 1,
          logs: [...(h.logs || []), `Progresso registrado em ${dataAtual}`],
        }
      }),
    )
  }

  const adicionarLog = (id, texto) => {
    const mensagem = texto.trim()
    if (!mensagem) return
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h
        return {
          ...h,
          logs: [...(h.logs || []), mensagem],
        }
      }),
    )
  }

  return (
    <HabitsContext.Provider
      value={{ habits, adicionarHabit, removerHabit, registrarDia, adicionarLog }}
    >
      {children}
    </HabitsContext.Provider>
  )
}

// Hook customizado — evita importar useContext + HabitsContext em cada consumidor
export function useHabits() {
  return useContext(HabitsContext)
}
