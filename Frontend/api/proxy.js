
const { createProxyMiddleware } = require('http-proxy-middleware');

export default async function handler(req, res) {
  console.log(`Request received: ${req.method} ${req.url}`);
  console.log("Request Headers:", req.headers);

  const proxy = createProxyMiddleware({
    target: 'http://jrtest-abdulrahman-badr.sportsontheweb.net',
    changeOrigin: true,
    secure: false,
    pathRewrite: { '^/api': '' },
    onProxyReq: (proxyReq, req, res) => {
      console.log(`Proxying request to: ${proxyReq.path}`);
      console.log("Request Method:", req.method);
      console.log("Request Headers:", req.headers);
    },
  });

  return new Promise((resolve, reject) => {
    proxy(req, res, (err) => {
      if (err) {
        console.error("Proxy error:", err);
        res.status(500).send("Proxy error");
      } else {
        resolve();
      }
    });
  });
}
