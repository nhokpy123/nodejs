const { createReservation, getUserReservations, deleteReservation } = require('../services/reservationservice');

exports.create = async (req, res) => {
    try {
        const reservation = await createReservation({ ...req.body, user: req.user.id });
        res.status(201).json(reservation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAll = async (req, res) => {
    try {
        const reservations = await getUserReservations(req.user.id);
        res.json(reservations);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        await deleteReservation(req.params.id, req.user.id);
        res.status(204).end();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
