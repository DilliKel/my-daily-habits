# My Daily Habits
> Aplicação web para cadastro, marcação e acompanhamento de hábitos diários pessoais.

## Sobre
O My Daily Habits resolve a necessidade de registrar e acompanhar a manutenção de hábitos diários, permitindo ao usuário criar, marcar e analisar o progresso de cada hábito individualmente ao longo do tempo.  
Este projeto foi desenvolvido como desafio final do módulo 04 do curso de Desenvolvimento Full Stack (ITEAM), mais especificamente para a matéria de Desenvolvimento Frontend com React.  
Fui o líder do squad (4 pessoas), delegando tarefas a cada integrante conforme suas habilidades. Atuei como principal responsável pelo frontend, arquitetando a aplicação e codificando a maior parte do projeto.

## Funcionalidades
- [x] Cadastro de novos hábitos (para manter ou abandonar)
- [x] Edição e exclusão de hábitos registrados
- [x] Marcação diária de hábitos concluídos/não concluídos
- [x] Visualização de histórico por hábito (catalogando dias realizados)
- [x] Armazenamento local dos dados (sem backend)
- [ ] Integração com API/backend (não implementado)
- [ ] Compartilhamento ou funcionalidades sociais (não implementado)

## Stack utilizada
- **React**: Construção da interface e controle de estado do app.
- **Vite**: Ferramenta para build e servidor local de desenvolvimento.
- **React Router Dom**: Controle de rotas e navegação entre páginas/telas.
- **TailwindCSS**: Estilização responsiva dos componentes e páginas.
- **LocalStorage**: Persistência dos dados diretamente no navegador do usuário.

## Como rodar localmente
1. Clone o repositório:
   ```bash
   git clone https://github.com/DilliKel/my-daily-habits.git
   cd my-daily-habits
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie a aplicação:
   ```bash
   npm run dev
   ```
4. Acesse `http://localhost:5173` no navegador.

Ou acesse online: [my-daily-habits-seven.vercel.app](https://my-daily-habits-seven.vercel.app/)

> Não é necessário backend, conta ou configuração extra.

## Aprendizados
- Liderança de squad: gerenciamento de tarefas e acompanhamento de entregas técnicas
- Arquitetura de aplicações SPA com React usando Vite
- Persistência de estado e dados usando apenas localStorage no front
- Criação de lógica para histórico diário e atualização em múltiplos hábitos
- Padronização de código e colaboração em time acadêmico real

## Status do projeto
Concluído  
Projeto 100% funcional nos requisitos do desafio, aprovado com nota máxima e utilizado como referência em React pelo curso.

---
