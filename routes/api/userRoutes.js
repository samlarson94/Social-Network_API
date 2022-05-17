const router = require('express').Router();
const {
   //Add all user controllers here
   getAllUser,
    getUserById,
    addUser,
    addFriend,
    updateUser,
    removeUser,
    removeFriend
} = require('../../controllers/userController');

// Endpoint - /api/users
router
    .route('/')
    .get(getAllUser) // Get all users
    .post(addUser); // Add a user

// Endpoint - /api/users/:userId
router
    .route('/:userId')
    .get(getUserById) //Get single user by ID
    .put(updateUser) // Update single user by ID
    .delete(removeUser); // Remove single user by ID

// Endpoint - /api/:userId/friends/:friendId
router 
    .route('/:userId/friends/:friendId')
    .post(addFriend) //Add friend by user ID
    .delete(removeFriend) //Remove friend by user ID


module.exports.router;