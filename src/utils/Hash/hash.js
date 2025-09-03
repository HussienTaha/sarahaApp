 import bcrypt from 'bcrypt';
  

  export  const hash= async ( {PLANTEXT , SALT_ROUNDS=process.env.SALT_ROUNDS }) => {
    return  bcrypt.hash(PLANTEXT, parseInt(SALT_ROUNDS));

  } 