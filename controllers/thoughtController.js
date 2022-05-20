const { User, Thought } = require("../models");
const thoughtController = {
//GET ALL THOUGHTS
getAllThought(req, res) {
        Thought.find({})
          .select("-__v")
          .sort({ _createdAt: -1 })
          .then(dbThoughtData => res.json(dbThoughtData))
          .catch((err) => {
            console.log(err);
            res.sendStatus(400);
          });
      },
//SORT 1 THOUGHT BY 1 ID
getThoughtbyId({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
      .select("-__v")
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

//ADD A THOUGHT
  // Also need to update corresponding User information
addThought({ params, body }, res) {
    console.log(params);
    Thought.create(body)
        .then(dbThoughtData => {
            // Add thought to thoughts array in User Model using findOneAndUpdate()
            User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: dbThoughtData._id } },
                { new: true, runValidators: true }
            )
            console.log(dbThoughtData);
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
},

//UPDATE THOUGHT
updateThought({ params, body }, res) {
    Thought.findOneAndUpdate(
        { _id: params.userId },
        { $set: body },
        { new: true, runValidators: true }
    )

    .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({ message: "Sorry, we were daydreaming. Could not find this thought." });
            return;
        } res.json(dbThoughtData);
    })
    .catch(err => res.json(err));
},

//ADD REACTION TO THOUGHT
addReaction({ params, body }, res) {
    console.log(params);
    // Update through reaction array within Thought model
    Thought.findOneAndUpdate(
        {_id: params.thoughtId },
        { $push: {reactions: body}},
        { new: true, runValidators: true}
    )

    .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({message: 'Could not find a thought to react to.'});
            return;
        }
        res.json(db.ThoughtData);
    })
    .catch(err => res.json(err));
},
//DELETE THOUGHT - And associated responses.
deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
        .then(deletedThought => {
            if (!deletedThought) {
                return res.status(404).json({ message: 'Could not find this thought.' });
            }
           
        })
        .catch(err => res.json(err));
    },

//DELETE REACTION TO THOUGHT
deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: { reactions: { reactionId: params.reactionId } } },
        { new: true }
    )
    .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    }
};

module.exports = thoughtController;