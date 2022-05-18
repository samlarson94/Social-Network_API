const { User, Thought } = require("../models");
const thoughtController = {
//GET ALL THOUGHTS
    getAllThought(req, res) {
        Thought.find({})
          .select("-__v")
          .sort({ _createdAt: -1 })
          .then((dbThoughtData) => res.json(dbThoughtData))
          .catch((err) => {
            console.log(err);
            res.sendStatus(400);
          });
      },
//SORT 1 THOUGHT BY 1 ID
getThoughtbyId({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
      .select("-__v")
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

//ADD A THOUGHT
  // After creating, update corresponding User information
addThought({ params, body }, res) {
    console.log(params);
    Thought.create(body)
        .then(dbThoughtData => {
            console.log(dbThoughtData);
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
},

//UPDATE THOUGHT

//ADD REACTION TO THOUGHT

//DELETE THOUGHT

//DELETE REACTION TO THOUGHT

modules.exports = thoughtController;