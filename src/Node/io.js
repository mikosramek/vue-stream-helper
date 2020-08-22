const fs = require('fs');
const path = require('path');
const os = require('os');

const IO = function (baseFolder) {
  this.filePath = path.join(`${os.homedir()}/${baseFolder}/`);

  this.writeFile = (data, fileName, callback) => {
    console.log('callback :', callback, 'io.js@9');
    this.checkFile(
      fileName,
      fs.writeFile(
        this.filePath + fileName,
        JSON.stringify(data, null, 2),
        'utf-8',
        (err) => {
          if (err) throw err;
          callback();
        },
      ),
    );
  };

  this.appendToFile = (data, fileName, callback) => {
    this.checkFile(
      fileName,
      fs.appendFile(
        this.filePath + fileName,
        `${JSON.stringify(data, null, 2)}\n`,
        'utf-8',
        (err) => {
          if (err) throw err;
          else callback();
        },
      ),
    );
  };

  this.readFile = (fileName) => {
    return new Promise((res) => {
      this.checkFile(
        fileName,
        fs.readFile(
          this.filePath + fileName,
          'utf-8',
          (err, data) => {
            if (err) throw err;
            if (data !== '') {
              res(JSON.parse(data));
            } else {
              res('');
            }
          },
        ),
      );
    });
  };

  this.checkFile = async (fileName, callback) => {
    console.log('Checking file...', 'io.js@58');
    if (!fs.existsSync(this.filePath)) {
      console.log('Making folder...', 'io.js@58');
      await fs.mkdirSync(this.filePath, (err) => {
        if (err) throw err;
        console.log('Writing file...', 'io.js@58');
        fs.writeFile(
          this.filePath + fileName,
          JSON.stringify({}, null, 2),
          'utf-8',
          (error) => {
            if (error) { throw error; }
            return callback();
          },
        );
      });
    } else if (!fs.existsSync(this.filePath + fileName)) {
      fs.writeFile(
        this.filePath + fileName,
        JSON.stringify({}, null, 2),
        'utf-8',
        (err) => {
          if (err) { throw err; }
          callback();
        },
      );
    }
  };
};

export default new IO('.stream-helper');
