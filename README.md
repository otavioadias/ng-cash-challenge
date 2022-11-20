# Boas vindas ao repositório do NG.CASH | TECH CHALLENGE!

Aplicação FullStack que possibilita os usuários da NG realizar transferências internas entre si. 🚀

#

# Contexto geral do projeto

<summary><strong>👨‍💻 Informações gerais sobre o projeto</strong></summary><br />

  O `NG.CASH | TECH CHALLENGE` é uma aplicação FullStack que possibilita usuários da NG realizar transferências internas entre si!

  Nesse projeto, foi construida **uma aplicação fullstack dockerizada utilizando modelagem de dados através do Sequelize para o Back-end utilizando Node.js e Typescript e React + Typescript para o Front-end**. 
  O desenvolvimento da aplicação **respeitou as regras de negócio** providas no desafio onde a **API desenvolvida deve ser capaz de ser consumida pelo front-end criado**.

  Para realizar tarefas na **HOME** é necessário ter um _token_, portanto a pessoa deverá estar logada para fazer as transferências ou visualizar as transações realizadas.

  O _token_ é gerado através do **LOGIN ou do REGISTER**, caso não tenha uma conta é possível se cadastrar.

</details>

<details>
<summary><strong>Estrutura do projeto</strong></summary><br />

O projeto é composto de 4 entidades importantes para sua estrutura:

1️⃣ **Banco de dados:**
  - Container docker POSTGRESQL já configurado no docker-compose através de um serviço definido como `db`.
  - Fornece os dados para o serviço de _backend_.
  - Durante a execução dos testes sempre vai ser acessado pelo `sequelize` e via porta `3002` do `localhost`;
  - Váriaveis utilizadas:
    - USERNAME=postgres
    - PASSWORD=123456
    - HOST=127.0.0.1 
    - PORT=3002
  ![Exemplo acesso banco de dados](backend/assets/database_config.png)

2️⃣ **Back-end:**
 - Stacks utilizadas:
    - Node.js
    - TypeScript
    - Sequelize
    - PostgreSQL
 - Ambiente com as regras de negócio para estruturação dos endpoints.
 - Rodando na porta `3001`, onde o front-end faz requisições para ele nessa porta por padrão;

3️⃣ **Front-end:**
  - Stacks utilizadas:
    - React
    - TypeScript
    - ANTD - Ant Design of React
    - CSS3
  - O front-end se comunica com o de back-end pela url `http://localhost:3001` através dos endpoints realizados no back-end.

4️⃣ **Docker:**
  - O `docker-compose.yml` uni todos os serviços conteinerizados (back-end, front-end e db).
  - Para subir o projeto completo utilize com o comando `npm run compose:up` ou `npm run compose:up:dev`;
  - Os arquivos de `Dockerfiles` para inicializar a aplicação estão nas raízes do `frontend` e `backend`.

</details>

#

# Orientações para executar o projeto

## Como inicializar o projeto
Atenção, pois aqui você encontrará informações importantes para inicializar corretamente o projeto.

<summary><strong> Iniciando o projeto</strong></summary><br />

  1. Clone o repositório utilizando do `SSH`
   * `git clone git@github.com:otavioadias/ng-cash-challenge.git`

  - Acesse a pasta do repositório clonado:
    * `cd ng-cash-challenge`

  2. Instale as dependências:
   * `npm install`

<summary><strong>🐳 Informações sobre Docker</strong></summary><br />

  ### Docker e Docker-compose

  ⚠ O docker-compose está na versão 3.9.  ⚠

⚠️ **Arquivos dockerfile:**

  - Nas pastas de `frontend/` e `backend/` existe um arquivo `Dockerfile` em cada, configurados corretamente para a aplicação começar a rodar.

⚠️ **Atenção:**

- No projeto contém um arquivo `docker-compose.yml` e `docker-compose.dev.yml`;
- O arquivo `docker-compose.yml` pode ser utilizado para executar a aplicação na sua máquina local, para isso é necessário executar o comando `npm run compose:up` ou para o modo de desenvolvimento `npm run compose:up:dev`na raiz do projeto.
- Para deburrar a aplicação é necessário executar o comando `npm run compose:down` ou para o modo de desenvolvimento `npm run compose:down:dev`na raiz do projeto.

#

## Informações sobre o desenvolvimento do projeto

Aqui você encontrará informações e sobre o desenvolvimento do projeto.

<details>
<summary><strong> ⌨️ Boas práticas </strong></summary><br/>

* Versionamento do projeto
  * Foi realizado `commits` das alterações no código regularmente;
</details>

<details id='Criptografia-de-senhas'>
<summary><strong>🔐 Criptografia de senhas </strong></summary><br />

⚠️ A biblioteca utilizada para criptografar a senha no banco de dados é a `bcryptjs` [bcryptjs npm](https://www.npmjs.com/package/bcryptjs) e que já vem instalada no projeto e não deve ser alterada ou substituída. ⚠️

</details>

<details id='sequelize'>
  <summary><strong>🎲 Sequelize</strong></summary>
  <br/>

  Para o desenvolvimento foi utilizado o Sequelize como ORM, seguindo o *Diagrama de Entidade-Relacionamento (DER)* para construir a modelagem do banco de dados. Com a imagem é possível saber:
  - Como foi nomeada as tabelas e colunas;
  - Quais são os tipos das colunas;
  - Relações entre tabelas.

    ![Exemplo banco de dados](backend/assets/diagrama.png)

</details>

<details id='testes-de-cobertura'>
  <summary><strong> Testes de cobertura </strong></summary><br/>

  A construção de testes de cobertura no back-end foi realizada em *TypeScript*, utilizando `mocha`, `chai` e `sinon`, na pasta `backend/src/tests/`.

  Para rodar testes de cobertura no seu back-end, utilize o comando: `npm test`.
  Atenção: É necessário utilizar o terminal dentro do backend para rodar os testes.
</details>

#

# Sobre o Projeto

## Back-end
O Back-end é composto de 4 seções principais:
1. Registration 
2. Login
3. Accounts
4. Transactions
5. Filter Transactions

### Seção 1 e 2: Registration e Login

-  As duas seções seguem as mesmas regras de negócio para verificação de username e password, mas são distintas, enquanto a "/registration" faz o cadastro no banco de dados, a "/login" verifica no banco de dados, verifica a senha e realiza o login.

- O endpoit utilizado para Cadastro é (`/registration`);
 - A rota é do tipo `POST`;
- O endpoit utilizado para Login é (`/login`);
 - A rota é do tipo `POST`;

- A rota deve receber os campos `username` e `password` e esses campos são validados no banco de dados verificando se não existe o username, se caso não exista irá ser cadastrado quando na rota "/registration" e se caso exista na rota "/login" será feito o login, seguindo os critérios:
  - O campo `username` deve ter no mínimo 3 caracteres;
  - O Campo `password` deve ter no mínino 8 caracteres, um número e uma letra maiúscula. 
  - Observação: O password é hashado ao ser armazenada no banco utilizando a biblioteca bcrypt.

- O body da requisição deve conter o seguinte formato:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- Se foi realizado com sucesso, o resultado deverá ser um token que foi gerado utilizando a biblioteca JWT, com um status http `201` para rota "/registration" e `200` para a rota "/login":
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc"
  }
  ```
 - Se não tiver o campo "username", o resultado retornado deverá ser a mensagem abaixo, com um status http `400`:
  ```json
    { "message": ""\"username\"/ is required"" }
  ```
- Se tiver o campo "username" vazio, o resultado retornado deverá ser a mensagem abaixo, com um status http `400`:
  ```json
    { "message": "\"username\" is not allowed to be empty" }
  ```
- Se tiver o campo "username" com menos de 3 caracteres, o resultado retornado deverá ser a mensagem abaixo, com um status http `400`:
  ```json
    { "message": "\"username\" length must be at least 3 characters long" }
  ```
- Se não tiver o campo "password", o resultado retornado deverá ser a mensagem abaixo, com um status http `400`:
  ```json
    { "message": ""\"password\"/ is required"" }
  ```
- Se tiver o campo "password" vazio, o resultado retornado deverá ser a mensagem abaixo, com um status http `400`:
  ```json
    { "message": "\"password\" is not allowed to be empty" }
  ```
- Se tiver o campo "password" é inválido, o resultado retornado deverá ser a mensagem abaixo, com um status http `400`:
  ```json
    { "message": "\"password\" with value \"***\" fails to match the required pattern: /^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\\d]{8,}$/" }
  ```

### Seção 3: Accounts

  - A rota "/account" é do tipo `GET` que receba um `header` com parâmetro `authorization`, onde ficará armazenado o token gerado no login;

  - Verifica se ao tentar bater na rota com um token válido, o mesmo retornará o id e balance do usuário.

  A resposta deve ser de status `200` com um `objeto` contendo a `id` e `balance` do *user*:
  ```json
    { 
      "id": "number",
      "balance": "number",
    }
  ```

### Seção 4: Transactions

- Todo usuário logado com um token válido deverá ser capaz de realizar um *cash-out* informando o *username* do usuário que sofrerá o *cash-in*, caso apresente *balance* suficiente para isso.
- Um usuário não pode realizar uma transferência para si mesmo.
- Toda nova transação bem-sucedida deverá ser registrada na tabela **Transactions**. 
 - Em casos de falhas transacionais, a tabela **Transactions** não deverá ser afetada.

- O endpoit utilizado para Transactions é (`/transactions`);
 - A rota é do tipo `PUT`;
 - A rota além de fazer a transação para o outro usuário realiza um update no balance do usuário atual e do usuário que ira recer o cash-in, modificando a tabela de Accounts consequentemente;

- A rota deve receber os campos `username` e `value` e esses campos são validados no banco de dados verificando se existe o username e se não é ele mesmo, se caso não exista não será feita a transação e se caso o valor seja menor ou negativo também não irá realizar a transação.

- O body da requisição deve conter o seguinte formato:
  ```json
  {
    "username": "string",
    "value": "number"
  }
  ```
- Se foi realizado com sucesso, o resultado deverá ser uma mensagem de sucesso com um status http `201`:
  ```json
  {
    "message": "Successful transaction!"
  }
  ```
- Se o valor for negativo ou o balance insuficiente, o resultado deverá ser uma mensagem de erro com um status http `401`:
  ```json
  {
    "message": "Cash should be greather than value that you wants transfer"
  }
  ```

- Se a pessoa tentar transferir para si mesma, o resultado deverá ser uma mensagem de erro com um status http `401`:
  ```json
  {
    "message": "You dont transfer for yourself"
  }
  ```

### Seção 5: Filter Transactions

- Todo usuário logado que apresente um token válido pode visualizar as suas transações financeiras (cash-out e cash-in) que participou.
- A tabela de **Transactions** pode ser filtrada por cash-out, cash-in e/ou date(createdAt). 

- O endpoit utilizado para visualizar todas as Transactions é (`/transactions`);
- O endpoit para filtrar as Transactions de cash-out é `/transactions/debited` e a de cash-in `/transactions/credited`;
- **Todas** as rotas de visualização das **Transactions**:
 - São do tipo `GET`;
 - Devem possuir o `token` no `header`para verificação do usuário e identificar as Transactions na qual ele participou;
 - Podem receber query params `date` com a data no formato `YYYY-MM-DD` para filtrar pela data da **Transaction**:
   - all é `/transactions?date=2022-11-20`
   - cash-out é `/transactions/debited?date=2022-11-20`
   - cash-in é `/transactions/credited?date=2022-11-20`

- Se o usuário possuir transações, o resultado deverá ser uma `Array<{}>` com um status http `200`:
  ```json
  [
    {
      "id": 1,
      "debitedAccountId": 3,
      "creditedAccountId": 1,
      "value": 3,
      "createdAt": "2022-11-20T00:53:25.337Z"
    },
    {
      "id": 2,
      "debitedAccountId": 3,
      "creditedAccountId": 1,
      "value": 3,
      "createdAt": "2022-11-20T00:53:25.503Z"
    },
    {
      "id": 3,
      "debitedAccountId": 3,
      "creditedAccountId": 1,
      "value": 3,
      "createdAt": "2022-11-20T00:53:25.668Z"
    },
    {
      "id": 4,
      "debitedAccountId": 3,
      "creditedAccountId": 1,
      "value": 3,
      "createdAt": "2022-11-20T00:53:25.847Z"
    },
    {
      "id": 5,
      "debitedAccountId": 3,
      "creditedAccountId": 1,
      "value": 3,
      "createdAt": "2022-11-20T00:53:26.020Z"
    },
    {
      "id": 6,
      "debitedAccountId": 3,
      "creditedAccountId": 1,
      "value": 3,
      "createdAt": "2022-11-20T00:53:26.201Z"
    },
    {
      "id": 7,
      "debitedAccountId": 3,
      "creditedAccountId": 1,
      "value": 3,
      "createdAt": "2022-11-20T00:53:26.370Z"
    },
    {
      "id": 8,
      "debitedAccountId": 3,
      "creditedAccountId": 1,
      "value": 3,
      "createdAt": "2022-11-20T00:53:26.559Z"
    },
    {
      "id": 9,
      "debitedAccountId": 3,
      "creditedAccountId": 1,
      "value": 3,
      "createdAt": "2022-11-20T00:53:26.739Z"
    }
  ]
  ```
- Se o valor for negativo ou o balance insuficiente, o resultado deverá ser uma mensagem de erro com um status http `401`:
  ```json
    {
      "message": "Cash should be greather than value that you wants transfer"
    }
  ```

- Se a pessoa tentar transferir para si mesma, o resultado deverá ser uma mensagem de erro com um status http `401`:
  ```json
    {
      "message": "You dont transfer for yourself"
    }
  ```

## Front-end
O Front-end é composto de 3 seções principais:
1. Login 
2. Register
3. Home

### Seção 1 e 2: Login e Register

-  As duas seções seguem as mesmas regras de negócio para verificação de username e password, mas são distintas, enquanto a "/registration" faz o cadastro no banco de dados, a Login "/" verifica no banco de dados, verifica a senha e realiza o login.

- O endpoit utilizado para Login é (`/`);
 -  ![Exemplo banco de dados](frontend/assets/login.png)
- O endpoit utilizado para Cadastro é (`/register`);
 - ![Exemplo banco de dados](frontend/assets/register.png)


- A rota deve receber os campos `username` e `password` e esses campos são validados no banco de dados verificando se não existe o username, se caso não exista irá ser cadastrado quando na rota "/register" e ir para a Home e se caso exista na rota "/login" será feito o login indo para a Home, seguindo os critérios:
  - O campo `username` deve ter no mínimo 3 caracteres;
  - O Campo `password` deve ter no mínino 8 caracteres, um número e uma letra maiúscula. 
  - Observação: 
    - Um objeto com username e token é salvos no `localStorage` toda vez que é feito login ou cadastro;
    - Um objeto com id e balance é salvo no `localStorage` toda vez que é feito login ou cadastro e atualizado quando feito uma transação;
    - Se o usuário fizer **Logout** os dados são limpados do `localStorage`.

 
### Seção 3: Home

#### Header

  - A rota "/home" possui um **Header** com o logo da **NG.CASH** e um botão de **Logout** que limpa todos os dados do usuário do `localStorage` e redireciona para a rota de Login (`/`);
    - ![Exemplo banco de dados](frontend/assets/logout.png)


#### Balance

  - Quando feito login ou cadastro o `balance` é salvo no `localStorage`, e o mesmo é retornado na **Home**, junto o username.
    - ![Exemplo banco de dados](frontend/assets/balance.png)
 

#### Transactions

- Todo usuário logado com um token válido deverá ser capaz de realizar um *cash-out* informando o *username* do usuário que sofrerá o *cash-in*, caso apresente *balance* suficiente para isso.
- Um usuário não pode realizar uma transferência para si mesmo.
- Toda nova transação bem-sucedida deverá ser registrada na tabela **Transactions**. 
 - Em casos de falhas transacionais, a tabela **Transactions** não deverá ser afetada.

- Seção voltada à realização de transferências para outros usuários NG a partir do username de quem sofrerá o cash-in;

- A **Home** (`/home`) consome o endpoit do backend utilizado para Transactions (`/transactions`);
  - ![Exemplo banco de dados](frontend/assets/new_transaction.png)

#### View and Filter Transactions
- Tabela com os detalhes de todas as transações que o usuário participou;
  - A tabela fica em modo *hide* para uma melhor experiência em **UX/UI** na página de **Home** para visualizar as **Transactions** basta clicar em **View Transactions** e caso queira esconder só clicar novamente;
  - Mecanismo para filtrar a tabela por data de transação e/ou transações do tipo *cash-in*/*cash-out*;
    - ![Exemplo banco de dados](frontend/assets/view_transaction.png)
    - ![Exemplo banco de dados](frontend/assets/transactions_table.png)

#### Forbidden
- A rota (`/home`) é protegida pelo **TOKEN** e verifica ele, caso alguém tente acessar a rota diretamente sem ter um token válido ou sem cadastro e ter efetuado o login, o usuário é transferido para uma página de erro;
  - ![Exemplo banco de dados](frontend/assets/forbidden.png)
  