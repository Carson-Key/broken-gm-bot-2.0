const CryptoJS = require("crypto-js");

function encrypt(value, key) {
    return CryptoJS.AES.encrypt(value, key).toString();
}
function decrypt(value, key) {
    return CryptoJS.AES.decrypt(value, key).toString(CryptoJS.enc.Utf8)
}

module.exports.encrypt = encrypt
module.exports.decrypt = decrypt