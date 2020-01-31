const showdown = require('showdown');
const fs = require('fs');

const converter = new showdown.Converter();

const toHtml = (md) => converter.makeHtml(md);

const readMd = async (file) => new Promise((resolve, reject) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) { reject(err); }
    resolve(toHtml(data));
  });
});

const writeHtml = (html) => {
  const name = 'dummy.html';
  fs.writeFile(`html/${name}`, html, (err) => {
    if (err) throw err;
  });
};

readMd('notes/readme.md').then((data) => {
  writeHtml(data);
});
