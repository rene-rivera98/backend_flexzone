const { Router } = require('express');
const { authUsers } = require('../controllers/auth');

const router = Router();


router.post('/', authUsers)


module.exports = router; 