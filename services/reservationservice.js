const Reservation = require('../models/reservationmodel');

exports.createReservation = async (data) => {
    const reservation = new Reservation(data);
    await reservation.save();
    return reservation;
};

exports.getUserReservations = async (userId) => {
    return await Reservation.find({ user: userId }).populate('service');
};

exports.deleteReservation = async (id, userId) => {
    const reservation = await Reservation.findOneAndDelete({ _id: id, user: userId });
    if (!reservation) throw new Error('Reservation not found or unauthorized');
    return reservation;
};
