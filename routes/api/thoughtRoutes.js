const router = require('express').Router();
const {
   //Add all thought controllers here
    getAllThought,
    getThoughtbyId,
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
    .get(getThoughtbyId) //Get single thought by ID
    .put(updateThought) // Update single thought by ID
    .delete(deleteThought); // Delete a single thought

// Endpoint - /api/:thoughtID/reactions
router 
    .route('/:thoughtId/reactions')
    .post(addReaction) //Add reaction to thought by thoughtID

// Endpoint - /api/:thoughtID/reactions/:reactionID
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction) //Delete reaction to thought by thoughtID


module.exports = router;