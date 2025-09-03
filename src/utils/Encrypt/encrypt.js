import CryptoJS from "crypto-js";


export const encrypt =async({PLAN_TEXET,SECRET_KEY_PHONE}={})=>{

      return CryptoJS.AES.encrypt( PLAN_TEXET,SECRET_KEY_PHONE).toString();

}