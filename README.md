# Task Manager Multitenant

Este é um gerenciador de tarefas multitenant desenvolvido com [Next.js](https://nextjs.org) e [Prisma](https://prisma.io). A aplicação permite que múltiplos clientes (tenants) utilizem o mesmo sistema, cada um com suas próprias tarefas e configurações visuais personalizadas.

## Funcionalidades

### 🏢 Sistema Multitenant

- Cada tenant é identificado pelo domínio/host da requisição
- Isolamento completo de dados entre diferentes tenants
- Configuração personalizada por tenant (cor principal, nome)

### ✅ Gerenciamento de Tarefas

- Criação e listagem de tarefas por tenant
- Controle de status (completa/incompleta)
- Interface simples e intuitiva

### 🎨 Personalização Visual

- Cor principal configurável para cada tenant
- Interface adaptada às cores do cliente
- Experiência visual única para cada organização

## Arquitetura Técnica

### Stack Tecnológica

- **Frontend**: Next.js 15 com React 19
- **Backend**: API Routes do Next.js
- **Banco de Dados**: PostgreSQL com Prisma ORM
- **Estilização**: Tailwind CSS
- **Linguagem**: TypeScript

### Estrutura do Banco de Dados

```prisma
model Tenant {
  id        Int     @id @default(autoincrement())
  host      String  @unique
  name      String
  mainColor String  @default("black")
  tasks     Task[]
}

model Task {
  id        Int      @id @default(autoincrement())
  label     String
  completed Boolean  @default(false)
  tenantId  Int
  tenant    Tenant   @relation(fields: [tenantId], references: [id])
}
```

## Como Funciona

1. **Identificação do Tenant**: O sistema identifica o tenant através do host da requisição (domínio)
2. **Busca de Configurações**: Carrega as configurações específicas do tenant (nome, cor principal)
3. **Renderização Personalizada**: Aplica as configurações visuais e carrega as tarefas específicas do tenant
4. **Isolamento de Dados**: Cada tenant vê apenas suas próprias tarefas e configurações

## Getting Started

## Pré-requisitos

Antes de iniciar, certifique-se de ter instalado:

- Node.js (versão 18 ou superior)
- PostgreSQL
- npm, yarn, pnpm ou bun

## Configuração do Ambiente

1. **Clone o repositório**:

```bash
git clone <url-do-repositorio>
cd task-manager-multitenant
```

2. **Instale as dependências**:

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. **Configure o banco de dados**:

   - Crie um banco PostgreSQL
   - Configure a variável de ambiente `DATABASE_URL` no arquivo `.env`:

   ```
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/task_manager"
   ```

4. **Execute as migrações do Prisma**:

```bash
npx prisma migrate dev
```

5. **Execute o servidor de desenvolvimento**:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

6. **Acesse a aplicação**:
   - Abra [http://localhost:3000](http://localhost:3000) no navegador
   - A aplicação identificará o tenant pelo host da requisição

## Configuração de Tenants

Para configurar um novo tenant, você pode:

1. **Adicionar dados diretamente no banco**:

```sql
INSERT INTO "Tenant" (host, name, "mainColor")
VALUES ('meudominio.com', 'Minha Empresa', '#0066cc');
```

2. **Usar o Prisma Studio** para gerenciar dados visualmente:

```bash
npx prisma studio
```

## Estrutura do Projeto

```
src/
├── app/
│   ├── components/
│   │   └── task-lists.tsx      # Componente para listar tarefas
│   ├── layout.tsx              # Layout principal
│   └── page.tsx                # Página principal
├── libs/
│   └── prisma.ts               # Configuração do Prisma Client
├── services/
│   ├── tasks.ts                # Serviços relacionados às tarefas
│   └── tenant.ts               # Serviços relacionados aos tenants
└── generated/
    └── prisma/                 # Cliente Prisma gerado
```

## Desenvolvimento

### Comandos Úteis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera a build de produção
- `npm run start` - Inicia o servidor em produção
- `npm run lint` - Executa o linter
- `npx prisma studio` - Abre o Prisma Studio
- `npx prisma migrate dev` - Aplica migrações do banco

### Adicionando Novas Funcionalidades

1. **Novas rotas da API**: Adicione em `src/app/api/`
2. **Novos componentes**: Adicione em `src/app/components/`
3. **Novos serviços**: Adicione em `src/services/`
4. **Mudanças no banco**: Edite `prisma/schema.prisma` e execute `npx prisma migrate dev`

## Learn More

## Recursos para Aprender Mais

Para saber mais sobre as tecnologias utilizadas:

- **Next.js**: [Documentação](https://nextjs.org/docs) | [Tutorial Interativo](https://nextjs.org/learn)
- **Prisma**: [Documentação](https://www.prisma.io/docs) | [Guia de Início Rápido](https://www.prisma.io/docs/getting-started)
- **TypeScript**: [Documentação](https://www.typescriptlang.org/docs/) | [Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- **Tailwind CSS**: [Documentação](https://tailwindcss.com/docs) | [Utilitários](https://tailwindcss.com/docs/utility-first)

### Repositórios Relacionados

- [Next.js GitHub](https://github.com/vercel/next.js) - Framework React para produção
- [Prisma GitHub](https://github.com/prisma/prisma) - ORM moderno para TypeScript e Node.js

## Deploy

## Deploy

### Vercel (Recomendado)

A forma mais fácil de fazer deploy é usando a [Plataforma Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme):

1. Faça push do código para um repositório Git
2. Conecte o repositório na Vercel
3. Configure a variável de ambiente `DATABASE_URL`
4. A Vercel fará o deploy automaticamente

### Outras Opções de Deploy

- **Railway**: Plataforma com suporte nativo ao PostgreSQL
- **Heroku**: Com add-on do PostgreSQL
- **DigitalOcean App Platform**: Deploy simples com banco gerenciado
- **AWS/Azure/GCP**: Para deploys mais complexos

### Configurações Importantes para Produção

- Configure corretamente a `DATABASE_URL` de produção
- Verifique se o banco PostgreSQL está acessível
- Configure os domínios dos tenants adequadamente
- Teste o sistema multitenant com diferentes hosts

Consulte a [documentação de deploy do Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para mais detalhes.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para:

- Reportar bugs
- Sugerir novas funcionalidades
- Enviar pull requests
- Melhorar a documentação

## Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
