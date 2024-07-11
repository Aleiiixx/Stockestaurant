// Importar las dependencias necesarias
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { sequelize} = require('./models');
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

sequelize.sync().then(() => {
  console.log('Database & tables created!');
});

app.use('/api', routes);


app.listen(PORT, async () => {
  console.log('Server is running on port 3000');
  await sequelize.authenticate();
  console.log('Database connected!');
});