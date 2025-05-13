# Introdução

Este projeto foi desenvolvido como parte do trabalho final da disciplina de Desenvolvimento Backend, com o objetivo de construir uma API RESTful robusta, modular e segura, utilizando a stack Node.js com JavaScript, integrada a um banco de dados relacional MySQL, com mapeamento de dados feito por meio do Sequelize.

A API oferece um sistema completo com múltiplas funcionalidades, que vai além da simples autenticação de usuários. Entre os principais recursos, destacam-se: autenticação com JWT, criptografia de senhas com bcrypt, cadastro e gerenciamento de entidades, relacionamentos entre tabelas, além de uma documentação interativa com Swagger.

O sistema foi projetado para refletir a estrutura de um backend de aplicação real, com foco em organização de código, segurança, modularidade e facilidade de escalabilidade.

Inicio - 12/05/2025
Fim - Desenvolvendo

# Tecnologias Utilizadas

Tecnologia  | Descrição 
----------- | -----------------------------------------------
Node.js     | Ambiente de execução de JavaScript no servidor
Express.js  | Framework web para APIs RESTful
MySQL       | Banco de dados relacional
Sequelize   | Abstração e manipulação de dados
bcryptjs    | Criptografia de senhas
JWT         | Autenticação com tokens seguros
Swagger     | Documentação interativa da API

# Estrutura do Projeto

O projeto foi estruturado com base em boas práticas e separação de responsabilidades:

```
/src
 ├── config/               # Configurações do projeto (DB, .env, etc.)
 ├── controllers/          # Lógica de controle de cada rota
 ├── models/               # Entidades do Sequelize (tabelas do banco)
 ├── middlewares/          # Autenticação, erros, logs
 ├── routes/               # Rotas da API agrupadas por módulo
 ├── docs/                 # Documentação Swagger
 └── server.js             # Inicialização do servidor
```
