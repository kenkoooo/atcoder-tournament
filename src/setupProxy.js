const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(
    '/api',
    createProxyMiddleware({
        target: 'https://atcoder-tournament.herokuapp.com',
        changeOrigin: true,
    })
);
};
