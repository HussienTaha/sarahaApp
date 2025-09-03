import jwt from 'jsonwebtoken';
//// generate token
 export  const  generateToken = async ({payload,signature,options }={})=>{
     return jwt.sign( payload, signature, options);
 }