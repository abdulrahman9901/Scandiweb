const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

// Serve static files from the .well-known directory
app.use("/.well-known", express.static(path.join(__dirname, ".well-known")));

// Proxy any other requests to the target server
app.use(
  "/api",
  createProxyMiddleware({
    target: "http://jrtest-abdulrahman-badr.sportsontheweb.net", // Replace with your target server
    changeOrigin: true,
    secure: false,
    pathRewrite: {
      "^/api": "", // Remove /api prefix when forwarding
    },
  })
);

// Fallback to serving the index.html file for SPA
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});
