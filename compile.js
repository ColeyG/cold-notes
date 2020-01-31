const showdown = require('showdown');
const fs = require('fs');

const converter = new showdown.Converter();

const toHtml = (md) => converter.makeHtml(md);

fs.readFile('notes/readme.md', 'utf8', (err, data) => {
  if (err) { console.log(err); }
  console.log(toHtml(data));
});
