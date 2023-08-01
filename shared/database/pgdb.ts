import { Sequelize } from 'sequelize';
// const result = require('dotenv').config();

// console.log(result)

// const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;


// const postgresql = new Sequelize(DB_NAME!, DB_USER!, DB_PASSWORD!, {
//   dialect: 'postgres',
//   host: DB_HOST!,
//   port: DB_PORT
// });

const inmemory = new Sequelize("sqlite::memory:", {
  logging: false
})

const sequelize = inmemory;
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();


export default sequelize;