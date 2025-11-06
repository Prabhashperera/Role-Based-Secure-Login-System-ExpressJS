
const adminOnlyMiddleware = (req, res, next) => {
    if(req.user.role !== "ADMIN") {
        res.status(451).json({
            message: "Access Denided, Admins Only Can do this Taks"
        })
    }
    next();
}

export default adminOnlyMiddleware;