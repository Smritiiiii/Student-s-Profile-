const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');



dotenv.config();


const requireAuth = async(req, res, next) => {
  try {
   
    const token = req.headers.authorization.split(" " )[1];
  
    
    const decoded = await jwt.verify(token, process.env.SECRET);
  
    req.user = decoded;

 
    next();
  } catch (error) {
  
     res.status(401).json({ error: 'Token verification failed' });
  }
};



module.exports = requireAuth;




























