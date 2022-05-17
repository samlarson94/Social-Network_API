const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);
//No homeroutes at this time

router.use((req, res) => res.send('Wrong route.'));

module.exports = router;