const jwt= require('jsonwebtoken');

module.exports = function auth(req,res,next){
  const token= req.header('x-auth-token');
  console.log("Token here HOW?" , token);
  //const role= req.cookie.role;

  if(!token ) return res.status(401).send('Access Denied. No Token Provided');

  try{
    
    //const decoded= jwt.verify(token, "jwtPrivateKey");
   // req.user= decoded;
    //console.log("Passed userr" , decoded);

    const decode= jwt.verify(token, "jwtPrivateKey");
    
    req.user= decode;
    console.log("deocde version", decode);
    console.log(decode.firstName);
    console.log(decode.role);
    next();
  }
  catch(ex){
    res.status(400).send("Invalid Token");
  }

  
}