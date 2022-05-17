const { builtinModules } = require("module");
const {User, Thought} = require("../models");
const userController = {
//GET ALL USERS - SORT BY ID
    getAllUser(req, res) {
        User.find({})
          .select("-__v")
          .sort({ _id: -1 })
          .then((dbUserData) => res.json(dbUserData))
          .catch((err) => {
            console.log(err);
            res.sendStatus(400);
          });
      },

//GET USER BY ID - INCLUDE THOUGHTS AND FRIENDS
      getUserById({ params }, res) {
        User.findOne({ _id: params.userId })
          .populate({
            path: "thoughts",
            select: "-__v",
          })
    
          .populate({
            path: "friends",
            select: "-__v",
          })
    
          .select("-__v")
          .then((dbUserData) => res.json(dbUserData))
          .catch((err) => {
            console.log(err);
            res.sendStatus(400);
          });
      },

//ADD A NEW USER
      addUser({ params, body }, res) {
        console.log(params);
        User.create(body)
            .then(dbUserData => {
                console.log(dbUserData);
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

//ADD FRIEND
    addFriend({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
    
        .then(dbFriendData => {
            if (!dbFriendData) {
                res.status(404).json({ message: 'Could not find a user with this ID' });
                return;
            } res.json(dbFriendData);
        })
        .catch(err => res.json(err));
    },

// PUT/UPDATE USER BY ID
  updateUser({ params, body }, res) {
    User.findOneAndUpdate(
        { _id: params.userId },
        { $set: body },
        { new: true, runValidators: true }
    )

    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'Could not find user with this ID' });
            return;
        } res.json(dbUserData);
    })
    .catch(err => res.json(err));
},

 // DELETE/REMOVE USER
 removeUser({ params }, res) {
    User.findOneAndDelete({ _id: params.userId })
        .then(deletedUser => {
            if (!deletedUser) {
                return res.status(404).json({ message: 'Could not find user with this ID' });
            }
            //DELETE ALL THOUGHTS OF DELETED USER
            return Thought.deleteMany({ _id: { $in: deletedUser.thoughts } })
        })

        .then(() => {
            res.json({ message: 'User and thier Thoughts have been successfully deleted.' })
        })
        .catch(err => res.json(err));
    },

//REMOVE FRIEND FROM USER
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: { friendId: params.friendId } } },
            { new: true }
        )

        .then(dbUserData => {
            if (!dbUserData) {
                return res.status(404).json({ message: 'Could not find friend with this Id!' });
            } res.json(dbUserData)
        })
        .catch(err => res.json(err));
}
};

module.export = userController;