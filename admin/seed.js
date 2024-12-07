const mongoose = require('mongoose');
const Service = require('../models/servicemodel');
require('dotenv').config();


const seed = async () => {
    const admin = new User({ username: adminUsername, password: adminPassword, role: 'admin' });
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await Service.deleteMany();

    await Service.insertMany([
        { name: 'Restaurant A', description: 'Fine dining' },
        { name: 'Cafe B', description: 'Cozy coffee shop' },
        { name: 'Event C', description: 'Live music' },
    ]);

    console.log('Database seeded');
    process.exit();
};

seed();
