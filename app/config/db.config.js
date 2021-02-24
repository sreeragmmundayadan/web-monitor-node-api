module.exports = {
  HOST: "localhost",//host name
  USER: "postgres",//host user name
  PASSWORD: "C0mplexPwd",//db password
  DB: "user_db",//db name
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};