const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

const auth = (req , res , next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            success: false,
            msg: "Invalid or Expired Token"
        });
    };
    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            msg: "Invalid or Expired Token"
        });
    };
};

module.exports = auth;
