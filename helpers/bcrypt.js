const bcrypt = require('bcrypt');

class Hash {
  static generate(password) {
    const salt = bcrypt.genSaltSync(8);
    const hash = bcrypt.hashSync(password, salt);

    return hash;
  }

  static verify(password, hash) {
    return bcrypt.compareSync(password, hash);
  }
}

module.exports = Hash;
