import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql', // or 'postgres', 'sqlite', etc.
});

// Sync all models with the database
sequelize.sync()
  .then(() => {
    console.log('Database & tables synced!');
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });

export default sequelize;
