import jwt from "jsonwebtoken";
export const handleGoogleCallback = (req, res) => {
    const user = req.user;
    if (!user || !user.emails) {
        res.status(401).json({ error: "User info not found" });
        return;
    }
    const payload = {
        id: user.id,
        email: user.emails[0].value,
    };
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign(payload, secret, {
        expiresIn: "1h",
    });
    res.status(200).json({
        sucess: true,
        token,
        user: {
            displayName: user.displayName,
            email: user.emails[0].value,
            id: user.id,
            profile_pic: user.photos ? user.photos[0].value : null,
        },
    });
};
//# sourceMappingURL=authController.js.map