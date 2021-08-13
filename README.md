# APIs de controle financeiro

Desafio: O desafio proposto é a implementação de um serviço para controle dos gastos e ganhos recebidos pelo usuário, onde ele poderá lançar o montante recebido/gasto e consultar um balanço do seu saldo por período. Para um melhor controle a aplicação permitirá o cadastro de categorias e subcategorias de dados, por exemplo categoria "Saúde" subcategoria "Farmácia", e cada lançamento será feito por subcategoria.

## Arquitetura

[Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

## Entidades

- Categorias ~> é um nicho de gastos ou ganhos que um usuário pode vir a ter.
- Subcategorias ~> é um nicho específico de uma categoria.
- Lançamentos ~> é uma entrada de um valor, podendo ser positivo (crédito) ou negativo (débito), todo lançamento além do valor deverá ter uma data, a subcategoria a qual pertence e opcionalmente um comentário.

## Serviços

- Balanço ~> Consulta o balanço geral dos lançamentos em um determinado período

## Documentação

- [APIs](./contratosApis.md)
- [Postman](./postman/)

## Tecnologias

- NodeJs
- TypeScript
- Serverless
- MySQL
- Jest
- AWS

## Requerimentos

- [Node](https://nodejs.org/en/) >= v.14.15.0
- [Serverless](https://www.serverless.com/framework/docs/providers/aws/guide/installation/) >= v.2
- Docker >= v.20
- Git

## Execução

```bash
1. git clone https://github.com/viniciusMartins52/controle-financeiro.git
2. cd .\controle-financeiro\
3. docker-compose up -d
4. npm i
5. npm run start
6. [HTTP] server ready: http://localhost:3000
```

## Teste

```bash
1. npm run test
2. npm run test-coverage (vai gerar uma pasta ./coverage)
```
