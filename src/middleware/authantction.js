import jwt from 'jsonwebtoken';
import UserModel  from '../DB/models/user.model.js';
import RevokedTokenModel from '../DB/models/revokedTokenModel.js';

export const authentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
const [ prefix , token ] = authorization.split(' ')||[];

if (!prefix || !token  )
{
    // return res.status(401).json({ message: 'token not exist ' });
     return res.status(401).json({ message: 'token not exist ' });

}

let segnature =""
 if (prefix === 'bearer') {

 segnature =process.env.ACCESS_TOKEN

 }
 else if (prefix== "admin"){
    segnature = process.env.ACCESS_TOKEN_ADMIN
 }
else{
    return res.status(401).json({ message: ' invalid prefix  token ' });
}

    const decoded = jwt.verify(token, segnature);
    console.log(decoded);

    console.log(segnature);
    
    // revoked token 
    const revoked =await RevokedTokenModel.findOne({tokenId:decoded.jti}) 
    if (revoked) {
      throw new Error(" you are revoked please login agin ",{ cause:400});
    }

    // fetch user from DB
    const user = await UserModel.findById(decoded.userId).lean();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if ( !user?.confirmed || user?.isDeleted==true) {
      return res.status(401).json({ message: "User not confirmed or is deleted" });

    }

    // attach user to request
    req.user = user;
    req.decoded=decoded

    return next();

  } catch (error) {
    // handle token errors
    if (
      error.message === "jwt expired" ||
      error.message === "invalid signature" ||
      error.name === "JsonWebTokenError"
    ) {
      return res.status(401).json({ message: "Invalid token" });
       
    
        

    }

    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
