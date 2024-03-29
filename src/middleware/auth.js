const {response} = require('./common')
const jwt = require('jsonwebtoken')
let key = process.env.JWT_KEY

const role = (req,res,next) => {
    if(req.params.role == 'toko' || req.params.role == 'pengunjung' ){
        return next()
    }
    return response(res, 404, false, null,"wrong role users")
}

const roleToko = (req,res,next) => {
    if(req.payload.role == 'toko'){
        return next()
    }
    return response(res, 404, false, null,"wrong role users")
}

const protect = (req,res,next) => {
    try{
        let token
        if(req.headers.authorization){
            let auth = req.headers.authorization
            token = auth.split(" ")[1]
            let decode = jwt.verify(token,key)
            req.payload = decode
            next()
        } else {
            return response(res, 404, false, null,"server need token")
        }
    } catch(err) {
        console.log(err) 
        if(err && err.name == 'JsonWebTokenError'){
            return response(res, 404, false, null,"invalid token")
        } else if (err && err.name == 'TokenExpriredError'){
            return response(res, 404, false, null,"expired token")
        } else {
            return response(res, 404, false, null,"token not active")
        }
    }
}
// module.exports = {role}
module.exports = {role,protect,roleToko}
