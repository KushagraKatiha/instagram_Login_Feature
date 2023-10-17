const JWT = require('jsonwebtoken')

const auth = (req, res, next) => {
    // verify token 
    // inject user info    
    try {

        const token = (req.cookies && req.cookies.token) || null;

        if(!token){
            throw new Error(`Not a valid user !!`)
        }

        const payload = JWT.verify(token, process.env.SECRET);
        req.client = {
            id: payload.id,
            email: payload.email
        }

        
        next()
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }

}


module.exports = auth