 import bcrypt from 'bcrypt';
  

  export  const comper= async ( {PLANTEXT , CIPHER_TEXT }) => {
    return  bcrypt.compareSync(PLANTEXT,CIPHER_TEXT );

  } 