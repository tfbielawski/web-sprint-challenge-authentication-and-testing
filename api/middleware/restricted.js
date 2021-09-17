const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../secrets/secrets')
  /*
    IMPLEMENT
    1- On valid token in the Authorization header, call next.
    2- On missing token in the Authorization header,
      the response body should include a string exactly as follows: "token required".
    3- On invalid or expired token in the Authorization header,
      the response body should include a string exactly as follows: "token invalid".
  */
module.exports = (req, res, next) => {
    const token = req.headers.authorization
    //If there is no token at all
    if (!token) return next({status: 401, message: "token required"})
    //If there is a token
    else {
        //Attempt to verify
        jwt.verify(token, JWT_SECRET,(err, decoded) => {
            //If doesn't verify
            if (err) return next({status: 401, message: "token invalid", realErrorMessage: err.message,})
            //If token is good
            else{
                req.decodedJwt = decoded
                next()
            }
          }
        )
    }
}