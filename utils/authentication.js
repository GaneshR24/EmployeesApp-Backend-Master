const { expressjwt } = require("express-jwt");

// Decrpytion the jwt - extracting the value & // Decrpytion -> JWT Token -> req.auth._id
exports.requireSignIn = expressjwt({
    secret: process.env.SECRET_KEY,
    algorithms: ['HS256'],
    userProperty: 'auth' //storing the value
});


//Authentication -> whether the user is logged in or not?
exports.isAuth = (req, res, next) => {
    let user = req.auth._id === req.params.userID;
    
    if(!user) {
        return res.status(401).send({message: 'Access Denied! Sign in required'})
    }
    next()
}
 