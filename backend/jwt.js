const jwt = require("jsonwebtoken");
const TOKEN_SECRET = process.env.TOKEN_SECRET || "secret123";

function generateAccessToken(userInfo) {
    return jwt.sign(userInfo, TOKEN_SECRET);
}

function decodeToken(token) {
    return jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return ['error',err]
        }
        return ['ok',decoded]
    });
}

function verifyToken(token) {
    return jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return false;
        }
        else {
            return true;
        }
    })
}

module.exports = {
    generateAccessToken,
    decodeToken,
    verifyToken
}