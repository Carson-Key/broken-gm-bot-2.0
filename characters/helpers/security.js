import CryptoJS from "crypto-js";

export const encrypt = (value, key) => {
    return CryptoJS.AES.encrypt(value, key).toString();
}
export const decrypt = (value, key) => {
    return CryptoJS.AES.decrypt(value, key).toString(CryptoJS.enc.Utf8)
}