const bcrypt = require('bcrypt');

class HashFunction {
  saltRounds = 10;

  hash(plainText) {
    const salt = bcrypt.genSaltSync(this.saltRounds);
    const hash = bcrypt.hashSync(plainText, salt);

    return hash;
  }

  compare(plainText, hashedText) {
    return bcrypt.compareSync(plainText, hashedText);
  }
}

module.exports = { HashFunction };
