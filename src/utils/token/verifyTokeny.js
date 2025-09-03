import jwt from 'jsonwebtoken';
//// generate token
 export  const  verifyToken = async ({payload,signature,options }={})=>{
     return jwt.verify( payload, signature, options);
 }