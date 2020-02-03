const http = require('http');
const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3000;

const app = express();
const httpServer = http.createServer(app);

httpServer.listen(3000, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '../public')));

const getTopLevelNav = () => {
  const files = fs.readdirSync('./html');
  const nav = [];
  files.forEach((file) => {
    if (file.includes('.html')) {
      nav.push({ file: file.replace('.html', ''), type: 'file' });
    } else if (fs.existsSync(`./html/${file}`) && file !== '.gitkeep') {
      nav.push({ file, type: 'dir' });
    }
  });
  return nav;
};

app.get('/', (req, res, next) => {
  res.status(200);
  res.render('index', { nav: getTopLevelNav() });
});
