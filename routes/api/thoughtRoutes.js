const router = require('express').Router();
const {
   //Add all thought controllers here
    getAllThought,
    getThoughtById,
    addThought,
    updateThought,
    addReaction,
    deleteThought,
    deleteReaction
} = require('../../controllers/thoughtController');

// Endpoint - /api/thoughts
router
    .route('/')
    .get(getAllThought) // Get all Thoughts
    .post(addThought); // Add a Thought

// Endpoint - /api/thought/:thoughtID
router
    .route('/:thoughtId')
    .get(getThoughtById) //Get single thought by ID
    .put(updateThought) // Update single thought by ID
    .delete(deleteThought); // Delete a single thought

// Endpoint - /api/:thoughtID/reactions/:reactionID
router 
    .route('/:thoughtId/reactions/:reactonId')
    .post(addReaction) //Add reaction to thought by thoughtID
    .delete(deleteReaction) //Delete reaction to thought by thoughtID


module.exports = router