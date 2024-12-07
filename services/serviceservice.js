const Service = require('../models/servicemodel');

exports.getAllServices = async () => {
    return await Service.find();
};
