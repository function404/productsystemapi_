# 📋 Projeto API RESTful com Node.js, Express, Sequelize e MySQL

Este é um projeto de **API RESTful robusta, modular e segura**,, utilizando a stack Node.js com JavaScript, integrada a um banco de dados relacional **MySQL**, com mapeamento de dados feito por meio do **Sequelize**.

O sistema foi projetado para refletir a estrutura de um backend de aplicação real, com foco em **organização de código, segurança, modularidade e facilidade de escalabilidade**.

**Última Atualização:** 05 Jun. 2025

---

## 🔧 Linguagem e Tecnologias Utilizadas

```bash
- Javascript                # Linguagem utilizada
- Node.js                   # Ambiente de execução de JavaScript no servidor
- Express.js                # Framework web para APIs RESTful
- MySQL                     # Banco de dados relacional
- Sequelize                 # Abstração e manipulação de dados
- bcryptjs                  # Criptografia de senhas 
- JWT                       # Autenticação com tokens seguros
- Swagger                   # Documentação interativa da API
```

---

## 📁 Estrutura do Projeto

```bash
productsystemapi_/ 
│-- src/ 
│ ├── config/               # Configurações do projeto (DB, .env, etc.)
│ ├── controllers/          # Lógica de controle de cada rota
│ ├── docs/                 # Documentação Swagger
│ ├── errors/               # Erros, logs com mensagens e status
│ ├── middlewares/          # Autenticação
│ ├── models/               # Entidades do Sequelize (tabelas do banco) 
│ ├── routes/               # Rotas da API agrupadas por módulo
│ ├── utils/                # Links do hypermidia
│ ├── server.js             # Inicialização do servidor
```

---

## ⚙️ Configuração do Projeto

1. **Clone o repositório**  
   ```bash
   git clone git@github.com:function404/productsystemapi_.git
   ```

2. **Instalar dependências**  
   ```bash
   npm install
   ```

3. **Iniciar servidor**  
   ```bash
   npm start
   ```
Servidor rodando em: http://localhost:3001

> ⚠️ Rodar o XAMPP com o MYSQL ativo e com o banco de dados informado criado. 

> ❗O servidor rodará na porta **3001** por padrão.

---

## 📌 Endpoints

### 🔑 Autenticação
- `POST /register` – Cadastro de novo usuário
- `POST /login` – Login e retorno do token JWT

### 👤 Usuários (`/api/users`)
- `GET /api/users` – Listar todos os usuários
- `GET /api/users/:id` – Buscar usuário por ID
- `POST /api/users` - Cadastro de novo usuário
- `PUT /api/users/:id` – Atualizar usuário
- `DELETE /api/users/:id` – Deletar usuário

### 📃 Categorias (`/api/categories`)
- `GET /api/categories` – Listar todas as categorias
- `GET /api/categories/:id` – Buscar categorias por ID
- `POST /api/categories` – Cadastro de nova categorias
- `PUT /api/categories/:id` – Atualizar categorias
- `DELETE /api/categories/:id` – Deletar categorias

### 📦 Produto (`/api/products`)
- `GET /api/products` – Listar todos os produtos
- `GET /api/products/:id` – Buscar produto por ID
- `POST /api/products` – Cadastro de novo produto
- `PUT /api/products/:id` – Atualizar produto
- `DELETE /api/products/:id` – Deletar produto

### ✅ Pedidos (`/api/orders`)
- `GET /api/orders/user` – Listar todos as pedidos do usuário autenticado
- `GET /api/orders/:id` – Buscar pedido por ID
- `POST /api/orders` – Criação de um pedido
- `DELETE /api/orders/:id` – Deletar pedido

> Todos os endpoints (exceto `/register` e `/login`) exigem token JWT válido.

---

## 🧪 Testes com Postman

Recomenda-se o uso do **Postman** para testar os endpoints. Crie uma nova requisição, adicione o token JWT no campo de headers:

```
Authorization: Bearer <seu_token>
```

---

## 📝 Licença

Projeto desenvolvido para fins educacionais e pode ser utilizado livremente para estudos.
