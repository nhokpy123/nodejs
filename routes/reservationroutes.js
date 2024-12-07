const express = require('express');
const { create, getAll, delete: deleteReservation } = require('../controllers/reservationcontroller');
const authMiddleware = require('../middleware/authmiddleware');
const router = express.Router();

router.post('/', authMiddleware, create);
router.get('/', authMiddleware, getAll);
router.delete('/:id', authMiddleware, deleteReservation);

module.exports = router;
