# 🎮 IBDN Demo — Demonstração Funcional

<div align="center">

![IBDN Logo](https://ibdn.org.br/wp-content/themes/ibdn-theme/assets/images/logo-ibdn.svg)

**Demonstração 100% funcional do sistema IBDN — sem backend, sem banco de dados**

[![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite_6-B73BFE?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222222?style=for-the-badge&logo=github&logoColor=white)](https://pages.github.com/)

</div>

---

## ✨ O que é isso?

Esta é uma **versão de demonstração standalone** da [plataforma IBDN](https://github.com/seu-usuario/IBDN). Todas as telas e funcionalidades do sistema estão presentes e navegáveis, mas sem dependência de backend ou banco de dados.

### Como funciona?

- Toda a camada de dados foi substituída por um **store in-memory** com dados mockados
- As operações de CRUD funcionam normalmente durante a sessão
- Os dados **resetam ao padrão** a cada reload da página (sem persistência)
- Dois perfis de usuário pré-definidos permitem explorar todas as telas

---

## 🔑 Credenciais de Acesso

| Perfil | Email | Senha | Acesso |
|---|---|---|---|
| **Administrador** | `admin@ibdn.com` | `12345678` | Todas as telas e funcionalidades |
| **Empresa** | `empresa@ibdn.com` | `12345678` | Home, Meu Cadastro, Solicitar Selo |

---

## 🚀 Executar Localmente

### Pré-requisitos

```
Node.js (LTS) ≥ 18.x
```

> Não é necessário Python, MySQL ou qualquer outro serviço.

### Instalação

```bash
git clone https://github.com/seu-usuario/ibdn-demo.git
cd ibdn-demo
npm install
npm run dev
```

✅ **App disponível em:** http://localhost:5173/ibdn-demo/

---

## 📄 Telas Disponíveis

### 🔧 Administrador (15 telas)

| Módulo | Telas |
|---|---|
| **Dashboard** | Home com Painel de Controle |
| **Empresas** | Lista, Criar, Detalhes (endereços + ramos + selos) |
| **Selos** | Gerenciar Tipos de Selo, Solicitações (aprovar/recusar) |
| **Ramos** | CRUD de ramos de atuação |
| **Acessos** | Utilizadores, Perfis, Permissões |

### 🏢 Empresa

| Módulo | Telas |
|---|---|
| **Dashboard** | Home com visão da empresa |
| **Cadastro** | Meu Cadastro (dados, endereços, ramos) |
| **Selos** | Solicitar Selo, Acompanhar status |

---

## 🛠️ Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| React | 19.1 | UI e componentes |
| Vite | 6.3 | Build tool e dev server |
| TailwindCSS | 4.1 | Estilização |
| Zustand | 5.0 | Estado global |
| React Router | 7.6 | Roteamento (HashRouter) |
| Lucide React | 1.8 | Ícones |

---

## 📂 Estrutura

```
ibdn-demo/
├── 📁 src/
│   ├── 📁 assets/         # Logos e imagens
│   ├── 📁 components/     # 28 componentes reutilizáveis
│   ├── 📁 data/           # ⭐ mockData.js + mockStore.js
│   ├── 📁 pages/          # 15 páginas da aplicação
│   ├── 📁 services/       # Services mockados (mesmo contrato da API real)
│   ├── 📁 store/          # authStore + notificationStore
│   ├── 📄 App.jsx         # Rotas e layout
│   └── 📄 main.jsx        # Entrypoint (HashRouter)
│
├── 📄 vite.config.js      # base: '/ibdn-demo/'
├── 📄 package.json
└── 📄 README.md           # Este arquivo
```

### Dados Mockados (`src/data/`)

- **`mockData.js`** — Fonte de dados: 3 empresas, 5 ramos, 4 tipos de selo, 5 selos, 4 usuários, 2 perfis, 6 permissões, 4 notificações
- **`mockStore.js`** — Store in-memory com CRUD genérico e delay simulado (200ms)

---

## 🌐 Deploy no GitHub Pages

### 1. Crie o repositório

Crie um repositório chamado `ibdn-demo` no GitHub.

### 2. Ajuste o base path (se necessário)

No `vite.config.js`, o `base` já está configurado como `/ibdn-demo/`. Se o nome do seu repositório for diferente, altere:

```js
base: '/nome-do-seu-repo/',
```

### 3. Build e deploy

```bash
# Build
npm run build

# Instalar gh-pages (única vez)
npm install -D gh-pages

# Deploy
npx gh-pages -d dist
```

### 4. Ativação

No GitHub: **Settings → Pages → Source:** selecione a branch `gh-pages`.

✅ Seu demo estará disponível em: `https://seu-usuario.github.io/ibdn-demo/`

---

## ⚠️ Limitações da Demo

- **Sem persistência:** dados resetam ao recarregar a página
- **Sem registro real:** o formulário de registro simula sucesso, mas não cria conta funcional
- **Sem upload de arquivos:** campos de upload são visuais apenas
- **Apenas 2 perfis:** Admin e Empresa (pré-definidos)

---

<div align="center">

📌 **Esta é uma versão de demonstração.** Para o projeto completo com backend FastAPI + MySQL, veja o [repositório principal](https://github.com/DSM2SEM2025/IBDN.git).

</div># IBDN-Demo
