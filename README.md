# SecondHand

### Prerequisites

1. [Git](https://git-scm.com/downloads)
    ```
    git --version
    ```
2. [Node.js](https://nodejs.org/en/)
    ```
    node -v
    ```
3. [PostgreSQL](https://www.postgresql.org/download/)
    ```
    psql --version
    ```
4. [Heroku](https://devcenter.heroku.com/articles/heroku-cli)
    ```
    heroku version
    ```

### How to Run In Local

1. Clone the repository
    ```
    git clone https://gitlab.com/NaufalK25/fejs-4-x-bejs-4-kel-6-secondhand.git
    ```
2. Install dependencies
    ```
    npm install
    yarn
    ```
3. Create database and tables, and insert data
    ```
    npx sequelize-cli db:create
    npx sequelize-cli db:migrate
    npx sequelize-cli db:migrate:undo:all # to undo all migrations
    npx sequelize-cli db:seed:all
    npx sequelize-cli db:seed:undo:all # to undo all seed
    ```
4. Run the server
    ```
    npm run dev
    yarn dev
    ```

Status: `Under Development`

### Base URL

1. [Development](https://localhost:8000)

2. [Staging](https://secondhand-be-api.herokuapp.com)

3. [Production](https://secondhand-6.herokuapp.com)
