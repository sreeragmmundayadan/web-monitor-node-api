module.exports = {
  HOST: "",//host name
  USER: "",//host user name
  PASSWORD: "",//db password
  DB: "user_db",//db name
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};