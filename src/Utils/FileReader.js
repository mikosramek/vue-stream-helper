const fs = require('fs');

export const ReadFile = function (filename) {
  return new Promise((res, rej) => {
    try {
      fs.readFile(filename, {}, (data) => res(JSON.parse(data)));
    } catch (e) {
      rej(e);
    }
  });
};

export const WriteFile = function (filename, data) {
  return new Promise((res, rej) => {
    try {
      fs.writeFileSync(filename, JSON.stringify(data, null, 2), res);
    } catch (e) {
      rej(e);
    }
  });
};