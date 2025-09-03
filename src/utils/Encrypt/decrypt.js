import CryptoJS from "crypto-js";


export const decrypt =async({CIPHER_TEXET,SECRET_KEY_PHONE}={})=>{

      return CryptoJS.AES.decrypt (CIPHER_TEXET,SECRET_KEY_PHONE).toString(CryptoJS.enc.Utf8);

}