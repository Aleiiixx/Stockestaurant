const fs = require('fs');
const path = require('path');
const express = require('express');

const router = express.Router();
const routesPath = __dirname;  // Ruta actual del directorio de rutas

fs.readdirSync(routesPath).forEach(file => {
  if (file !== 'index.js' && file.endsWith('.js')) {
    const route = require(path.join(routesPath, file));
    // Usa el nombre del archivo como prefijo de ruta, sin la extensión .js
    const routeName = `/${path.basename(file, '.js')}`;
    router.use(routeName.split('R')[0], route);
  }
});

module.exports = router;
