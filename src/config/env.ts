export const env = {
  // Database
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: parseInt(process.env.DB_PORT || '5432', 10),
  DB_USERNAME: process.env.DB_USERNAME || 'cms_user',
  DB_PASSWORD: process.env.DB_PASSWORD || 'cms_password',
  DB_DATABASE: process.env.DB_DATABASE || 'cms_db',

  // JWT
  JWT_SECRET: process.env.JWT_SECRET || 'your-super-secret-key-change-this-in-production',
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || '12h',

  // Application
  PORT: parseInt(process.env.PORT || '3000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
}; 