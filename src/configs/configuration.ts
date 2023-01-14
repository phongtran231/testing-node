export default () => ({
  app_port: parseInt(process.env.APP_PORT) || 3000,
  db: {
    user_name: process.env.MYSQL_USER || 'user',
    password: process.env.MYSQL_PASSWORD || 'password',
    db_name: process.env.MYSQL_DATABASE || 'db',
    db_host: process.env.MYSQL_HOST || 'localhost',
    db_port: '3306',
  }
});