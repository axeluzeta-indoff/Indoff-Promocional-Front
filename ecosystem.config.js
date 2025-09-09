module.exports = {
  apps: [
    {
      name: 'indoff-api-dev',
      cwd: './api',
      script: 'npm',
      args: 'run start:dev',     // Nest CLI con watch
      interpreter: '/Users/axel/.nvm/versions/node/v20.19.5/bin/node',       // ejecuta el bin de npm
      watch: false,              // el watch ya lo hace Nest
      autorestart: true,
      env: { NODE_ENV: 'development' },
      out_file: './logs/api-out.log',
      error_file: './logs/api-err.log',
      time: true,
    },
    {
      name: 'indoff-front-dev',
      cwd: './front',
      script: 'npm',
      args: 'run dev',           // Vite dev server con HMR
      interpreter: '/Users/axel/.nvm/versions/node/v20.19.5/bin/node',
      watch: false,              // HMR lo hace Vite
      autorestart: true,
      env: {
        NODE_ENV: 'development',
        VITE_API_URL: 'http://localhost:3000',
      },
      out_file: './logs/front-out.log',
      error_file: './logs/front-err.log',
      time: true,
    },
  ],
};
