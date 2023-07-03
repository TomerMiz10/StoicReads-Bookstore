const userDbService = require('../services/auth0Service');

const getUserByID = async (req, res) => {
    try {
        const {userID} = req.params;
        const user = await userDbService.getUserByID(userID);

        if (!user) {
            return res.status(404).json({
                message: "User not found, please make sure it's the correct userID",
                success: false
            });
        }
        console.log("Successfully retrieved user by its ID");
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Internal Server Error, couldn't fetch user by it's ID", success: false});
    }
};

module.exports = {
    getUserByID
};

