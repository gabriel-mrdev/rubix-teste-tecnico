# Sistema CRUD de Livros - Monorepo

## 📋 Descrição

Sistema completo de gerenciamento de livros desenvolvido como **monorepo** com **frontend moderno** (Vite + TypeScript + React) e **backend robusto** (Node.js + Express + TypeScript), implementando operações CRUD completas com **SQLite** como banco de dados.

## 🏗️ Arquitetura

### Frontend (Vite + TypeScript + React)

- **Interface moderna e responsiva** com Tailwind CSS
- **TypeScript** para type safety
- **React Router** para navegação
- **Axios** para comunicação com API
- **Componentes reutilizáveis** e bem estruturados
- **Validação de formulários** em tempo real

### Backend (Node.js + Express + TypeScript)

- **API REST** completa e documentada
- **Arquitetura em camadas** (Controller, Service, Model)
- **Validações robustas** de dados
- **Tratamento de erros** abrangente
- **Middleware de segurança** (Helmet, CORS)
- **Logging** com Morgan

### Banco de Dados

- **SQLite** para persistência de dados
- **Scripts de inicialização** automáticos
- **Dados de exemplo** pré-cadastrados

## 🚀 Tecnologias Utilizadas

### Frontend

- **Vite** - Build tool moderno e rápido
- **React 19** - Biblioteca de interface
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **React Router** - Roteamento
- **Axios** - Cliente HTTP
- **Vitest** - Framework de testes

### Backend

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **TypeScript** - Tipagem estática
- **SQLite3** - Banco de dados
- **Jest** - Framework de testes
- **Helmet** - Segurança HTTP
- **CORS** - Cross-Origin Resource Sharing
- **Morgan** - Logger HTTP

### DevOps

- **Docker** - Containerização
- **Docker Compose** - Orquestração
- **ESLint** - Linting
- **Prettier** - Formatação
- **NPM Workspaces** - Gerenciamento de monorepo

## 📦 Estrutura do Projeto

```
crud-livros-monorepo/
├── packages/
│   ├── frontend/                 # Aplicação React + Vite
│   │   ├── src/
│   │   │   ├── components/       # Componentes React
│   │   │   ├── pages/           # Páginas da aplicação
│   │   │   ├── services/        # Serviços de API
│   │   │   ├── types/           # Tipos TypeScript
│   │   │   ├── hooks/           # Custom hooks
│   │   │   ├── utils/           # Utilitários
│   │   │   └── test/            # Configuração de testes
│   │   ├── Dockerfile
│   │   └── package.json
│   └── backend/                  # API Node.js + Express
│       ├── src/
│       │   ├── controllers/     # Controladores
│       │   ├── services/        # Lógica de negócio
│       │   ├── models/          # Modelos de dados
│       │   ├── routes/          # Rotas da API
│       │   ├── database/        # Conexão com banco
│       │   ├── middleware/      # Middlewares
│       │   ├── scripts/         # Scripts utilitários
│       │   ├── types/           # Tipos TypeScript
│       │   └── test/            # Testes
│       ├── Dockerfile
│       └── package.json
├── docker-compose.yml           # Orquestração Docker
├── package.json                 # Configuração do monorepo
└── README.md                    # Este arquivo
```

## 🛠️ Instalação e Execução

### Pré-requisitos

- **Node.js** (versão 18 ou superior)
- **npm** (gerenciador de pacotes)
- **Docker** e **Docker Compose** (opcional)

### Instalação Local

1. **Clone o repositório**

   ```bash
   git clone <url-do-repositorio>
   cd crud-livros-monorepo
   ```

2. **Instalar dependências**

   ```bash
   npm install
   ```

3. **Inicializar banco de dados**

   ```bash
   npm run init-db
   ```

4. **Executar em modo desenvolvimento**

   ```bash
   # Executar frontend e backend simultaneamente
   npm run dev

   # Ou executar separadamente:
   npm run dev:frontend  # Frontend na porta 3000
   npm run dev:backend   # Backend na porta 3001
   ```

### Execução com Docker

1. **Build e execução**

   ```bash
   npm run docker:build
   npm run docker:up
   ```

2. **Acessar aplicação**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## 📚 Funcionalidades

### CRUD Completo

- ✅ **Create** - Cadastrar novos livros
- ✅ **Read** - Listar e buscar livros
- ✅ **Update** - Atualizar livros existentes
- ✅ **Delete** - Remover livros

### Busca Avançada

- 🔍 **Por título** - Busca parcial no título
- 🔍 **Por autor** - Busca parcial no autor
- 🔍 **Por categoria** - Busca por categoria
- 🔍 **Por ID** - Busca exata por ID

### Interface Moderna

- 📱 **Responsiva** - Funciona em desktop e mobile
- 🎨 **Design moderno** - Interface limpa e intuitiva
- ⚡ **Performance** - Carregamento rápido
- 🔄 **Real-time** - Atualizações em tempo real

### Validações Robustas

- ✅ **Campos obrigatórios** - Título, autor, data de cadastro
- ✅ **Tipos de dados** - Validação de números, datas, textos
- ✅ **Intervalos válidos** - Anos, preços, páginas
- ✅ **Formato de dados** - Datas, ISBN, etc.

## 🧪 Testes

### Executar Testes

```bash
# Todos os testes
npm test

# Testes do frontend
npm run test:frontend

# Testes do backend
npm run test:backend

# Testes com cobertura
npm run test:coverage
```

### Cobertura de Testes

- **Frontend**: Componentes, hooks, utilitários
- **Backend**: Controllers, services, models
- **Integração**: Testes de API

## 🔧 Scripts Disponíveis

### Monorepo

```bash
npm run dev              # Executar frontend e backend
npm run build            # Build de produção
npm run test             # Executar todos os testes
npm run lint             # Verificar código
npm run format           # Formatar código
npm run docker:build     # Build Docker
npm run docker:up        # Executar com Docker
npm run docker:down      # Parar Docker
```

### Frontend

```bash
npm run dev:frontend     # Desenvolvimento
npm run build:frontend   # Build
npm run test:frontend    # Testes
npm run lint:frontend    # Linting
```

### Backend

```bash
npm run dev:backend      # Desenvolvimento
npm run build:backend    # Build
npm run test:backend     # Testes
npm run init-db          # Inicializar banco
```

## 📊 API Endpoints

### Livros

- `GET /api/livros` - Listar todos os livros
- `GET /api/livros/:id` - Buscar livro por ID
- `POST /api/livros` - Cadastrar novo livro
- `PUT /api/livros/:id` - Atualizar livro
- `DELETE /api/livros/:id` - Deletar livro

### Busca

- `GET /api/livros/categoria/:categoria` - Buscar por categoria
- `GET /api/livros/autor/:autor` - Buscar por autor
- `GET /api/livros/titulo/:titulo` - Buscar por título

### Sistema

- `GET /api/health` - Health check
- `GET /api/livros/estatisticas` - Estatísticas do sistema

## 🎯 Modelo de Dados

### Livro

```typescript
interface Livro {
  id?: number; // ID único (auto-incremento)
  titulo: string; // Título (obrigatório)
  autor: string; // Autor (obrigatório)
  isbn?: string; // ISBN (opcional)
  ano_publicacao?: number; // Ano de publicação (opcional)
  preco?: number; // Preço em reais (opcional)
  data_cadastro: string; // Data de cadastro (obrigatório)
  descricao?: string; // Descrição (opcional)
  categoria?: string; // Categoria (opcional)
  editora?: string; // Editora (opcional)
  numero_paginas?: number; // Número de páginas (opcional)
}
```

## 🔒 Segurança

- **Helmet** - Headers de segurança HTTP
- **CORS** - Controle de acesso cross-origin
- **Validação de entrada** - Sanitização de dados
- **Rate limiting** - Proteção contra abuso
- **Error handling** - Não exposição de informações sensíveis

## 📈 Performance

- **Vite** - Build ultra-rápido
- **Tree shaking** - Otimização de bundle
- **Code splitting** - Carregamento sob demanda
- **Caching** - Cache de recursos estáticos
- **Compression** - Compressão gzip

## 🐳 Docker

### Desenvolvimento

```bash
# Build das imagens
docker-compose build

# Executar serviços
docker-compose up

# Executar em background
docker-compose up -d

# Parar serviços
docker-compose down
```

### Produção

```bash
# Build para produção
docker-compose -f docker-compose.prod.yml build

# Executar em produção
docker-compose -f docker-compose.prod.yml up -d
```

## 🚀 Deploy

### Opções de Deploy

1. **Docker** - Containerização completa
2. **Vercel** - Frontend (Vite + React)
3. **Railway** - Backend (Node.js + Express)
4. **Heroku** - Full-stack
5. **AWS/GCP** - Cloud providers

### Variáveis de Ambiente

```bash
# Backend
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://seu-frontend.com

# Frontend
VITE_API_URL=https://sua-api.com
```

## 🎨 Clean Code e Boas Práticas

### Princípios SOLID

- ✅ **Single Responsibility** - Cada classe tem uma responsabilidade
- ✅ **Open/Closed** - Aberto para extensão, fechado para modificação
- ✅ **Liskov Substitution** - Substituição de implementações
- ✅ **Interface Segregation** - Interfaces específicas
- ✅ **Dependency Inversion** - Inversão de dependências

### Padrões de Design

- 🏗️ **Repository Pattern** - Separação de acesso a dados
- 🎯 **Service Layer** - Camada de serviços
- 🔄 **Singleton** - Conexão única com banco
- 🏭 **Factory** - Criação de objetos

### Qualidade de Código

- 📏 **ESLint** - Análise estática
- 💅 **Prettier** - Formatação consistente
- 🧪 **Jest/Vitest** - Testes unitários
- 📚 **JSDoc** - Documentação inline

## 📝 Diferenciais Implementados

### ✅ Testes Unitários

- Cobertura abrangente de funcionalidades
- Testes de componentes React
- Testes de API e serviços
- Mocks e stubs apropriados

### ✅ Containerização

- Dockerfile otimizado para produção
- Docker Compose para desenvolvimento
- Multi-stage builds
- Volumes persistentes

### ✅ Logs

- Sistema de logging estruturado
- Logs de requisições HTTP
- Logs de erros e exceções
- Rotação de logs

### ✅ Documentação

- README completo e detalhado
- Documentação de API
- Comentários no código
- Exemplos de uso

## 🐛 Solução de Problemas

### Problemas Comuns

1. **Erro de conexão com banco**

   ```bash
   npm run init-db
   ```

2. **Dependências não instaladas**

   ```bash
   npm install
   ```

3. **Porta já em uso**

   ```bash
   # Alterar porta no .env
   PORT=3002
   ```

4. **Erro de build**
   ```bash
   npm run build
   ```

## 📄 Licença

Este projeto foi desenvolvido para o **Case Técnico Rubix - DTI Digital**.

---

## 🎯 Conclusão

Este projeto demonstra:

- ✅ **Conhecimento em tecnologias modernas** (Vite, TypeScript, React)
- ✅ **Arquitetura bem estruturada** (Monorepo, Clean Code)
- ✅ **Implementação completa de CRUD** com SQLite
- ✅ **Interface moderna e responsiva**
- ✅ **API REST robusta e documentada**
- ✅ **Testes unitários abrangentes**
- ✅ **Containerização com Docker**
- ✅ **Boas práticas de desenvolvimento**

**Desenvolvido com ❤️ para o processo seletivo DTI Digital**
