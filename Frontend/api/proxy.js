const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

// Proxy any requests starting with /api to the target server
app.use(
  "/api",
  createProxyMiddleware({
    target: "http://jrtest-abdulrahman-badr.sportsontheweb.net", // Replace with your target server
    changeOrigin: true,
    secure: false,
    pathRewrite: {
      "^/api": "", // Remove /api prefix when forwarding
    },
    onProxyReq: (proxyReq, req, res) => {
      // Log the request details before forwarding
      console.log(`Proxying request to: ${proxyReq.path}`);
      console.log("Request Method:", req.method);
      console.log("Request Headers:", req.headers);
      console.log("Request Body:", req.body);
      
    },
  })
);

// Serve static files from the .well-known directory
app.use("/.well-known", express.static(path.join(__dirname, ".well-known")));

// Fallback to serving the index.html file for SPA
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});
