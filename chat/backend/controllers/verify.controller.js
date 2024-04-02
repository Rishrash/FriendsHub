import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";


const verifyToken = async (token) => {
	console.log("inside verify");
	const decoded = jwt.verify(token, process.env.JWT_SECRET);
	const _id = decoded._id;
	console.log("user ID : " + _id);
	const user = await User.findOne({ _id });
	if (!user) {
		return null;
	}
	return ({
		_id: user._id,
		username: user.username,
		profilePicture: user.profilePicture,
		token: token
	});
};

const verify = async (req, res) => {
    console.log("inside verify");
    const receivedData = req.body;
    //console.log(receivedData.token);
    const decoded = jwt.verify(receivedData.token, process.env.JWT_SECRET);
    const _id = decoded._id;
    //console.log("user ID : " + _id);
    const user = await User.findOne({ _id });
    if (!user) {
        return res.status(400).json({ error: "Invalid user" });
    }
    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
        _id: user._id,
        username: user.username,
        profilePicture: user.profilePicture,
        token: receivedData.token
    });
    res.json(decoded);
};

export default verify;