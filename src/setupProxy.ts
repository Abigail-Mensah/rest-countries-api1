import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = function (app: any) {
  app.use(
    '/v3.1',
    createProxyMiddleware({
      target: 'https://restcountries.com',
      changeOrigin: true,
    })
  );
};
