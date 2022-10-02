const fs = require('fs');

const path = require('path');

const decodeImg = (req, res, next) => {
  if (req.body.image) {
    const buffer = Buffer.from(req.body.image, 'base64');

    const filePath = `${Date.now()}_${req.body.text.replace(/ /g, '_')}.jpeg`;

    fs.writeFileSync(path.join(__dirname, '..', 'tmp', filePath), buffer);

    req.files = {
      image: {
        name: filePath,
        data: buffer,
        tempFilePath: path.join(__dirname, '..', 'tmp', filePath),
      },
    };

    req.body.filePath = path.join(__dirname, '..', 'tmp', filePath);
  }
  next();
};

module.exports = {
  decodeImg,
};
