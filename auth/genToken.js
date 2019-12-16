const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/secrets.js');

function genToken(user) {
    const payload = {
        id: user.id,
        username: user.username
    };

    const options = { expiresIn: '1h' };

    const signedToken = jwt.sign(payload, jwtSecret, options);

    return signedToken;
}

module.exports = genToken;