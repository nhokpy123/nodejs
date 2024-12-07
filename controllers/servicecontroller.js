const { getAllServices } = require('../services/serviceservice');

exports.getServices = async (req, res) => {
    try {
        const services = await getAllServices();
        res.json(services);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
