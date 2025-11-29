# 💎 Escova Express

> Sistema Fullstack completo para agendamento de serviços de beleza e gestão administrativa.

![Status](https://img.shields.io/badge/Status-Concluído-green)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

## 💻 Sobre o Projeto

O **Escova Express** é uma plataforma que conecta clientes ao salão de beleza. O sistema permite que clientes visualizem o catálogo de serviços e realizem agendamentos online. Para o administrador, oferece um painel de controle para gerenciar agendamentos e editar serviços.

O projeto foi construído utilizando arquitetura moderna, com **TypeScript** em ambas as pontas (Front e Back), garantindo tipagem segura e código limpo.

## 🏗️ Estrutura do Repositório

O projeto está organizado como um monorepo:

- 📂 **backend/**: API RESTful (Node.js/Express)
  - Responsável pela lógica de negócios, validação (Zod), conexão com banco (Prisma) e regras de segurança.
- 📂 **frontend/**: Single Page Application (React)
  - Interface responsiva, integração via Axios e validação de formulários.

## ✨ Funcionalidades Principais

- **CRUD Completo:** Criação, Leitura, Atualização e Exclusão de agendamentos e serviços.
- **Validação Rigorosa:** Uso de **Zod** no Backend e Frontend para garantir dados corretos.
- **Segurança:** Bloqueio de agendamentos em horários duplicados e Senha para área administrativa.
- **Banco de Dados Relacional:** Modelagem de tabelas com relacionamentos via PostgreSQL.
- **Integração:** Comunicação fluida entre Front e Back via Axios.

## 🚀 Tecnologias Utilizadas

| Frontend | Backend | Banco de Dados |
| :--- | :--- | :--- |
| React.js | Node.js & Express | PostgreSQL (Neon Tech) |
| TypeScript | TypeScript | Prisma ORM |
| Bootstrap 5 | Zod (Validação) | |
| Axios | Cors & Dotenv | |

## ⚙️ Como Rodar o Projeto Localmente

Para rodar o sistema completo, você precisará de **dois terminais** abertos simultaneamente.

### Pré-requisitos
- Node.js instalado
- Git instalado

### 1. Configurando o Backend (API)

Abra o terminal na pasta raiz e entre no backend:

```bash
cd backend
npm install

Crie um arquivo .env na pasta backend/ com as configurações do seu banco (Exemplo):

Fragmento do código

PORT=3001
DATABASE_URL="postgres://seu_usuario:senha@host:porta/banco?sslmode=require"
Inicie o servidor:

Bash

npm start
O servidor rodará na porta 3001.

## 2. Configurando o Frontend (Site)
Abra um segundo terminal, volte à raiz e entre no frontend:

Bash

cd frontend
npm install
npm start
O site abrirá automaticamente na porta 3000.

🔒 Acesso Administrativo
Para testar as funcionalidades de edição e exclusão:

Clique em "Área Admin" no rodapé do site.

Utilize a senha padrão configurada no backend (Ex: exemplo123).


