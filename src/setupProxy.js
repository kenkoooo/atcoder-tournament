const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://abc-api.kenkoooo.com",
      changeOrigin: true,
    })
  );
};
