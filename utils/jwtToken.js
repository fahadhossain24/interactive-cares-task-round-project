const jwt = require("jsonwebtoken");

exports.generateToken = (user) => {
    const {email} = user;
    const payload = {
        email,
    };
    const token = jwt.sign(payload, process.env.JWT_TOKEN_SECRET, {
        expiresIn: '1h'
    });
    return token;
}