import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if(!token) {
        return res.status(500).json({message : "token not found"})
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if(err) return res.status(500).json({message : "token not verified"});
        req.user = decoded;
        next();
    });
}

export default authMiddleware;