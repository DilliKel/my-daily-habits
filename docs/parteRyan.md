# Parte Ryan — Exercício 7/7 (Atualizado)

> Objetivo: formulário com tipo + cor, grade de cards (até 3 por linha), página de hábitos e estilos novos.

Qualquer dúvida manda um zap

## 1) Substituir src/components/HabitList.jsx

```jsx
// src/components/HabitList.jsx
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HabitCard from './HabitCard'
import { useHabits } from '../contexts/HabitsContext'

function HabitList() {
  // Hábitos e funções vêm do contexto — não do useState local
  const { habits, adicionarHabit, removerHabit, registrarDia } = useHabits()
  const navigate = useNavigate()

  // Estado de UI — continua local (só o formulário usa)
  const [form, setForm] = useState({
    novoNome:      '',
    novaDescricao: '',
    novaCategoria: '',
    novoTipo:      'manter',
    novaCor:       '#2563eb',
    novaMeta:      '7',
  })
  const [erroNome, setErroNome] = useState('')
  const nomeInputRef = useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (name === 'novoNome') {
      if (value.length > 0 && value.length < 3) {
        setErroNome('O nome deve ter pelo menos 3 caracteres.')
      } else {
        setErroNome('')
      }
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.novoNome.trim() || erroNome) {
      nomeInputRef.current?.focus()
      return
    }
    const novoHabit = {
      id:         Date.now(),
      nome:       form.novoNome,
      descricao:  form.novaDescricao,
      categoria:  form.novaCategoria || 'Geral',
      tipo:       form.novoTipo,
      cor:        form.novaCor || '#111827',
      meta:       parseInt(form.novaMeta) || 7,
      ativo:      true,
      diasFeitos: 0,
      logs:       [],
    }
    adicionarHabit(novoHabit)
    setForm({
      novoNome: '',
      novaDescricao: '',
      novaCategoria: '',
      novoTipo: 'manter',
      novaCor: '#2563eb',
      novaMeta: '7',
    })
    setErroNome('')
    navigate('/habitos')
  }

  if (!habits) return null

  return (
    <section>
      <form onSubmit={handleSubmit} className="habit-form">
        <div>
          <label>
            Nome do hábito *
            <input
              type="text"
              name="novoNome"
              value={form.novoNome}
              onChange={handleChange}
              ref={nomeInputRef}
            />
          </label>
          {erroNome && <p style={{ color: 'red', fontSize: '0.8rem' }}>{erroNome}</p>}
        </div>

        <div>
          <label>
            Descrição
            <input
              type="text"
              name="novaDescricao"
              value={form.novaDescricao}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <label>
            Categoria
            <input
              type="text"
              name="novaCategoria"
              value={form.novaCategoria}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <label>
            Tipo do hábito
            <select
              name="novoTipo"
              value={form.novoTipo}
              onChange={handleChange}
            >
              <option value="manter">Hábito que quero manter</option>
              <option value="parar">Mau hábito que quero parar</option>
            </select>
          </label>
        </div>

        <div>
          <label>
            Cor do card
            <input
              type="color"
              name="novaCor"
              value={form.novaCor}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <label>
            Meta (dias por semana)
            <input
              type="number"
              name="novaMeta"
              min="1"
              max="7"
              value={form.novaMeta}
              onChange={handleChange}
            />
          </label>
        </div>

        <button type="submit">Adicionar hábito</button>
      </form>

      <div className="habit-grid">
        {habits.length === 0 && (
          <p>Nenhum hábito cadastrado ainda. Que tal começar?</p>
        )}

        {habits.map((habit) => (
          <HabitCard
            key={habit.id}
            id={habit.id}
            nome={habit.nome}
            descricao={habit.descricao}
            categoria={habit.categoria}
            tipo={habit.tipo}
            cor={habit.cor}
            meta={habit.meta}
            ativo={habit.ativo}
            diasFeitos={habit.diasFeitos}
            logs={habit.logs}
            onRemover={() => removerHabit(habit.id)}
            onRegistrarDia={() => registrarDia(habit.id)}
          />
        ))}
      </div>
    </section>
  )
}

export default HabitList
```

## 2) Substituir src/pages/PaginaHabitos.jsx

```jsx
// src/pages/PaginaHabitos.jsx
import HabitList from '../components/HabitList'

function PaginaHabitos() {
  return (
    <main className="pagina-habitos">
      <h1>Meus Hábitos</h1>
      <HabitList />
    </main>
  )
}

export default PaginaHabitos
```

## 3) Substituir src/App.css inteiro

```css
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}


.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

.card {
  padding: 2em;
}

.read-the-docs {
  color: #888;
}

.habit-form {
  background-color: #ffffff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.1);
  margin-bottom: 16px;
}

.habit-form label {
  display: block;
  margin-bottom: 8px;
  font-size: 0.9rem;
  text-align: left;
}

.habit-form input {
  width: 100%;
  padding: 6px 8px;
  margin-top: 4px;
  border-radius: 4px;
  border: 1px solid #d4d4d8;
  font-size: 0.9rem;
  box-sizing: border-box;
}

.habit-form button,
.habit-card button {
  margin-top: 8px;
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  background-color: #111827;
  color: #f9fafb;
  cursor: pointer;
}

.buttonFlex {
  display: flex;
  justify-content: center;
}

.classeNome {
  background-color: #111827;
  color: #f9fafb;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  background-color: #111827;
  color: #f9fafb;
}

.header-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.1rem;
}

.header-nav {
  display: flex;
  gap: 16px;
}

.nav-link {
  color: #d1d5db;
  text-decoration: none;
  font-size: 0.95rem;
  padding: 4px 8px;
  border-radius: 4px;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #ffffff;
}

.nav-link.ativo {
  color: #ffffff;
  font-weight: 600;
  background-color: rgba(255, 255, 255, 0.1);
}

.pagina-inicio {
  text-align: center;
  padding: 32px 16px;
}

.resumo {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 16px;
  margin: 24px 0;
}

.resumo-card {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px 16px;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.resumo-card strong {
  font-size: 1.8rem;
  color: #111827;
}

.resumo-card span {
  font-size: 0.85rem;
  color: #6b7280;
}

.btn-primario {
  display: inline-block;
  margin-top: 8px;
  padding: 10px 20px;
  border-radius: 6px;
  background-color: #111827;
  color: #f9fafb;
  text-decoration: none;
  font-size: 0.95rem;
  transition: background-color 0.2s;
  border: none;
  cursor: pointer;
}

.btn-primario:hover {
  background-color: #1f2937;
}

.habit-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-top: 12px;
}

.habit-card {
  text-align: left;
}

.habit-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.habit-icon {
  width: 28px;
  height: 28px;
  object-fit: contain;
}

.habit-tipo {
  font-size: 0.75rem;
  color: #6b7280;
}

.habit-form select,
.log-form input {
  width: 100%;
  padding: 6px 8px;
  margin-top: 4px;
  border-radius: 4px;
  border: 1px solid #d4d4d8;
  font-size: 0.9rem;
  box-sizing: border-box;
}

.habit-form input[type='color'] {
  height: 38px;
  padding: 3px;
}

.pagina-detalhes {
  padding: 16px;
  max-width: 700px;
  margin: 0 auto;
}

.detalhe-card {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.1);
  margin-top: 16px;
  text-align: left;
}

.detalhe-info {
  list-style: none;
  padding: 0;
  margin: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 0.95rem;
}

.detalhe-acoes {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.btn-voltar {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0;
}

.btn-voltar:hover {
  color: #111827;
}

.btn-remover {
  padding: 10px 14px;
  border-radius: 4px;
  border: 1px solid #ef4444;
  background-color: transparent;
  color: #ef4444;
  cursor: pointer;
  font-size: 0.9rem;
}

.log-form {
  margin-top: 16px;
}

.log-form button {
  margin-top: 8px;
}

.logs-lista {
  margin-top: 12px;
  padding-left: 18px;
}

.pagina-404 {
  text-align: center;
  padding: 56px 16px;
}

@media (max-width: 980px) {
  .habit-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .header {
    flex-direction: column;
    gap: 10px;
  }

  .habit-grid {
    grid-template-columns: 1fr;
  }
}
```
