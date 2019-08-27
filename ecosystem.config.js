module.exports = {
  apps : [{
    name: 'API',
    script: 'app.js',
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      URL_DB: 'mongodb://localhost:27017/soportes',
      NAME_DB: 'soportes'
    },
    env_production: {
      NODE_ENV: 'production',
      URL_DB: 'mongodb+srv://soporte:Lenovo1993@soportes19-kjgq0.mongodb.net/test?retryWrites=true&w=majority',
      NAME_DB: 'soportes'
    }
  }],
};
