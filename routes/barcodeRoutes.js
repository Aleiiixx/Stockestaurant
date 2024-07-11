const express = require('express');
const router = express.Router();

// Define tus rutas
router.get('/', (req, res) => {
  res.send('Lista de codigos de barras');
});
router.get('/:id', (req, res) => {
  res.send(`Usuario con ID: ${req.params.id}`);
});

module.exports = router;
