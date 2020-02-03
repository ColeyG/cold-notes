const { exec } = require('child_process');
const config = require('../config.json');

const clone = exec(`git clone ${config.repo} notes`);
