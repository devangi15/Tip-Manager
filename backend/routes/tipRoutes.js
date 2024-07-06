const express = require('express');
const { calculateTip, getTips } = require('../controllers/tipController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/calculate', auth, calculateTip);
router.get('/', auth, getTips);

module.exports = router;
