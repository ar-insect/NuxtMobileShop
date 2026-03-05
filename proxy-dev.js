const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 8000;
const API_TARGET = 'http://localhost:4000'; // Nuxt backend
const WEB_TARGET = 'http://localhost:8081'; // Expo web dev server

// Proxy API requests to Nuxt backend
// Mount at /api so Express handles matching.
// Express strips /api from req.url, so we append it back in pathRewrite.
app.use(
  '/api',
  createProxyMiddleware({
    target: API_TARGET,
    changeOrigin: true,
    pathRewrite: (path, req) => {
      // path is the stripped path, e.g. '/products'
      // we want to forward '/api/products'
      return '/api' + path;
    },
    logLevel: 'debug',
  })
);

// Proxy everything else to Expo Web
app.use(
  '/',
  createProxyMiddleware({
    target: WEB_TARGET,
    changeOrigin: true,
    ws: true, // Proxy websockets for HMR
    logLevel: 'debug',
  })
);

app.listen(PORT, () => {
  console.log(`\n> Proxy server running at http://localhost:${PORT}`);
  console.log(`> - /api/*  -> ${API_TARGET}/api/*`);
  console.log(`> - /*      -> ${WEB_TARGET}/*`);
});
