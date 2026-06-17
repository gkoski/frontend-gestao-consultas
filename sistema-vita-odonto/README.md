# 🦷 Vita Odonto — Frontend

Sistema de gerenciamento de consultas para uma clínica odontológica. Esta é a aplicação **frontend**, desenvolvida em **Angular**, responsável pela interface de agendamento, cadastros e relatórios da clínica.

> ℹ️ Este repositório contém apenas o **frontend**. A aplicação consome uma API REST separada desenvolvida em **Java (Spring Boot)**, que precisa estar rodando para o sistema funcionar.

---

## ✨ Funcionalidades

- **Autenticação via JWT** com dois perfis de acesso: **Administrador** e **Dentista**
- **Controle de acesso por perfil** — links da navbar e rotas protegidos conforme o perfil logado
- **Dashboard** com indicadores (total de consultas, agendadas, finalizadas, taxa de cancelamento), próximas consultas e gráficos (consultas por status e por dentista)
- **Gestão de Consultas** — criar, listar, buscar (por paciente ou dentista) e cancelar (com motivo), com validações de data e tratamento de conflito de horário
- **Gestão de Pacientes** — CRUD completo
- **Gestão de Dentistas** — CRUD com CRO, especialidades e status (ativo/inativo)
- **Gestão de Especialidades**
- **Gestão de Usuários** (somente Administrador) — CRUD, definição de perfil, redefinição de senha
- **Relatórios** — listagem de consultas com filtros (paciente, dentista, status e intervalo de datas)
- **Aviso de sessão expirada** — modal automático quando o token expira
- **Interface responsiva** (mobile-first) — navbar vira menu lateral e tabelas viram cards em telas pequenas

---

## 🛠️ Tecnologias

- [Angular](https://angular.dev/) (componentes standalone)
- [Angular Material](https://material.angular.io/) — componentes de UI (modais, selects, datepicker, etc.)
- [Tailwind CSS](https://tailwindcss.com/) — estilização
- [ng2-charts](https://valor-software.com/ng2-charts/) / Chart.js — gráficos do dashboard
- [ngx-mask](https://www.npmjs.com/package/ngx-mask) — máscara de CPF
- **JWT** — autenticação (token armazenado no `localStorage`)

---

## 📋 Pré-requisitos

- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- [Angular CLI](https://angular.dev/tools/cli) instalado globalmente:
  ```bash
  npm install -g @angular/cli
  ```
- A **API backend (Spring Boot)** rodando em `http://localhost:8080`

---

## 🚀 Como rodar

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd sistema-vita-odonto
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Verifique se o backend está rodando** em `http://localhost:8080`
   (a URL da API está configurada nos serviços do projeto)

4. **Inicie a aplicação**
   ```bash
   ng serve
   ```

5. **Acesse no navegador**
   ```
   http://localhost:4200
   ```

---

## 🔑 Acesso

O login é feito com **e-mail e senha** de um usuário cadastrado na tabela de usuários do backend. O perfil (Administrador ou Dentista) é definido no cadastro e determina o que o usuário pode acessar:

| Perfil        | Acesso |
|---------------|--------|
| **Administrador** | Todas as telas (dashboard, consultas, pacientes, dentistas, especialidades, usuários, relatórios) |
| **Dentista**      | Dashboard, consultas e pacientes |

> Usuários precisam existir na tabela de **usuários** do backend (com senha) para conseguir logar. O cadastro de **dentistas** é um registro profissional separado e não possui credenciais de acesso.

---

## 📁 Estrutura do projeto

```
src/app/
├── pages/              # Telas do sistema
│   ├── login/
│   ├── dashboard/
│   ├── consultas/
│   ├── pacientes/
│   ├── dentistas/
│   ├── especialidades/
│   ├── usuarios/
│   └── relatorios/
├── services/           # Serviços de comunicação com a API
├── layout/             # Layout com navbar lateral e router-outlet
├── guards/             # Proteção de rotas por perfil (admin)
├── interceptors/       # Interceptor que anexa o token JWT e trata sessão expirada
├── app.routes.ts       # Rotas da aplicação
└── app.config.ts       # Configuração (providers, locale pt-BR, etc.)
```

---

## 🌐 Integração com o backend

O frontend consome a API REST em `http://localhost:8080`. As principais integrações:

- `POST /auth/login` — autenticação (retorna o token JWT)
- `/consultas`, `/pacientes`, `/dentistas`, `/especialidades`, `/usuarios` — operações de CRUD
- `/consultas/relatorios` — consultas filtradas para a tela de relatórios

Todas as requisições autenticadas enviam o token no cabeçalho `Authorization: Bearer <token>` automaticamente, via interceptor.

---

## 📱 Responsividade

A interface foi construída com abordagem **mobile-first**:

- Em telas grandes, a **navbar** fica fixa à esquerda; em telas pequenas, vira um menu acessível por botão (☰).
- As **tabelas** de listagem se transformam em **cards** empilhados no mobile, facilitando a leitura.
- Grids, modais e filtros se ajustam ao tamanho da tela.

---

## 📝 Observações

- O idioma e o formato de datas estão configurados para **português do Brasil (pt-BR)**.
- A seleção de datas é feita exclusivamente pelo calendário (datepicker), evitando erros de digitação.
- Este projeto foi desenvolvido como trabalho final de estágio.