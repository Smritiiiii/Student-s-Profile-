const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');



dotenv.config();


const requireAuth = async(req, res, next) => {
  try {
   
    const token = req.headers.authorization.split(" " )[1];
  
    // Verify and decode the token
    const decoded = await jwt.verify(token, process.env.SECRET);
  
    // Attach the decoded user information to the request
    req.user = decoded;

    // Continue to the next middleware or route
    next();
  } catch (error) {
  
     res.status(401).json({ error: 'Token verification failed' });
  }
};



module.exports = requireAuth;




























