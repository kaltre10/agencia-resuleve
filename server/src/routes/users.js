const express = require('express');
const { getUsers, getUserById } = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth');
const roleMiddleware = require('../middlewares/role');

const router = express.Router();

router.get('/', authMiddleware, roleMiddleware(['admin']), getUsers);
router.get('/:id', authMiddleware, roleMiddleware(['admin']), getUserById);

module.exports = router;
