const JWT = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers['authorization'];

        // Check if the authorization header exists
        if (!authorizationHeader) {
            return res.status(401).send({
                success: false,
                message: 'Authorization header missing',
            });
        }

        // Split and get the token
        const token = authorizationHeader.split(" ")[1];

        if (!token) {
            return res.status(401).send({
                success: false,
                message: 'Token missing from authorization header',
            });
        }

        // Verify the token
        JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: 'Invalid or expired token',
                });
            } else {
                req.body.userId = decode.userId;  // This is where the userId is attached to req.body
                next();
            }
        });
        
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            success: false,
            error,
            message: 'Authentication error',
        });
    }
};
