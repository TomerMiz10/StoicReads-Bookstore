const userService = require("../services/userService");

const getUserById = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await userService.getUserById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found", success: false });
        }

        console.log('Successfully retrieved a user by their ID');
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        console.log('Successfully retrieved all users');
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error, couldn't fetch users", success: false });
    }
};

module.exports = {
    getUserById,
    getAllUsers
};





