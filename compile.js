const showdown = require('showdown');
const fs = require('fs');
const rra = require('recursive-readdir-async');

const converter = new showdown.Converter();

const toHtml = (md) => converter.makeHtml(md);

const ensureDirExists = (fileName) => new Promise((resolve, reject) => {
  let path = fileName.split('/');
  if (path.length >= 1) {
    path.pop();
    path = path.join('/');
    fs.mkdir(path, { recursive: true }, (err) => {
      if (err) throw err;
      resolve();
    });
  } else {
    resolve();
  }
});

const readMd = async (file) => new Promise((resolve, reject) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) { reject(err); }
    resolve(data);
  });
});

const writeHtml = (name, html) => {
  ensureDirExists(`html/${name}`).then(() => {
    fs.writeFile(`html/${name}`, html, (err) => {
      if (err) throw err;
    });
  });
};

rra.list('./notes/').then((list) => {
  list.forEach((note) => {
    const file = `notes${note.fullname.split('/notes')[1]}`;
    readMd(file).then((md) => {
      const newFileName = file.replace('notes/', '').replace('.md', '.html');
      writeHtml(newFileName, toHtml(md));
    });
  });
});
