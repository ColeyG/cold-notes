const http = require('http');
const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3000;

const app = express();
const httpServer = http.createServer(app);

httpServer.listen(3000, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
  res.status(200);
  res.render('index');
});
