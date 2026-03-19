# Task Manager API

API RESTful para gerenciamento de tarefas, desenvolvida com foco em arquitetura limpa, autenticação JWT, boas práticas de backend e testes automatizados.

## Objetivo

Este projeto foi desenvolvido como parte de um portfólio profissional para demonstrar conhecimentos em desenvolvimento backend com Node.js, TypeScript, Prisma e PostgreSQL.

## Tecnologias utilizadas

- Node.js
- TypeScript
- Express
- Prisma ORM
- PostgreSQL
- JWT (JSON Web Token)
- Zod
- Vitest
- Supertest

## Funcionalidades

- Cadastro de usuários
- Login com autenticação JWT
- Rota protegida para usuário autenticado
- CRUD de tarefas
- Associação de tarefas por usuário
- Paginação de tarefas
- Filtro por status
- Busca por título e descrição
- Testes automatizados de integração

## Estrutura do projeto

```
src/
  application/
    use-cases/
  config/
  domain/
    errors/
  infrastructure/
    db/
    providers/
    repositories/
  interfaces/
    http/
      controllers/
      middlewares/
      routes/
      validators/
      types/
  main/

  ```

## Padrões e boas práticas aplicadas

- Separação por camadas
- Middleware de autenticação
- Tratamento centralizado de erros
- Validação com Zod
- Uso de variáveis de ambiente
- Testes de integração com Vitest e Supertest

## Rotas principais

**Auth**

- POST /auth/register
- POST /auth/login

**Usuário autenticado**

- GET /me

**Tasks**

- POST /tasks
- GET /tasks
- PATCH /tasks/:id
- DELETE /tasks/:id

## Exemplo de uso

**Registrar usuário**

POST /auth/register
Content-Type: application/json
{
  "name": "Lipe",
  "email": "lipe@email.com",
  "password": "123456"
}
**Login**
POST /auth/login
Content-Type: application/json
{
  "email": "lipe@email.com",
  "password": "123456"
}
**Criar tarefa**
POST /tasks
Authorization: Bearer TOKEN
Content-Type: application/json
{
  "title": "Estudar testes automatizados",
  "description": "Implementar testes com Vitest e Supertest"
}

## Paginação e filtros

**Exemplos de listagem:**

GET /tasks?page=1&limit=10
GET /tasks?status=todo
GET /tasks?search=jwt

## Variáveis de ambiente

*Crie um arquivo .env com base no exemplo abaixo:*

DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/task_manager?schema=public"
JWT_SECRET="sua_chave_secreta"
JWT_EXPIRES_IN="1h"
BCRYPT_SALT_ROUNDS="10"
PORT="3333"
CORS_ORIGIN="http://localhost:5173"

## Como rodar o projeto localmente

1. Instalar dependências
npm install
2. Rodar as migrations
npx prisma migrate dev
3. Iniciar o servidor
npm run dev

*A aplicação ficará disponível em:*

http://localhost:3333

## Rodando os testes

npm test

## Resultado atual dos testes

- 5 arquivos de teste
- 9 testes passando
