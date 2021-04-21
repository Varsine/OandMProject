const env = process.env.ENV || 'development';

const configs = {
  development: {
    API: 'https://tokens.bscswap.com',
  },
  production: {
    API: 'https://tokens.bscswap.com',
  },
}[env];

export default configs;
