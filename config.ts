export default {
  PORT: process.env.PORT || 3000,
  DB_PORT: process.env.DB_PORT || 'mongodb://127.0.0.1/mesto',
  JWT_SECRET: process.env.JWT_SECRET || 'some-secret-key',
};
