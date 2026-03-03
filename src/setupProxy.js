const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Proxy Firebase Cloud Functions endpoints
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5001',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // Remove /api prefix before sending to Firebase emulator
      },
      onError: (err, req, res) => {
        console.error('Proxy error:', err);
        res.status(503).json({
          error: 'Service unavailable',
          message: 'Backend API is not running. Start Firebase Functions with: firebase emulators:start'
        });
      }
    })
  );

  // Proxy to Python Flask API for direct model access (optional)
  app.use(
    '/flask-api',
    createProxyMiddleware({
      target: 'http://localhost:5001',
      changeOrigin: true,
      pathRewrite: {
        '^/flask-api': '', // Remove /flask-api prefix
      },
    })
  );
};
