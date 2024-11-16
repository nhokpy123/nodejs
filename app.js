const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Booking = require('./models/Booking');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


mongoose.connect('mongodb://localhost:27017/bookingsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.get('/', async (req, res) => {
  const bookings = await Booking.find();
  res.render('index', { bookings });
});

//dat cho~
app.get('/new', (req, res) => {
  res.render('new');
});

//xu ly cho moi'
app.post('/new', async (req, res) => {
  const { customerName, date, time } = req.body;
  const newBooking = new Booking({ customerName, date, time });
  await newBooking.save();
  res.redirect('/');
});

//sua? dat. cho~
app.get('/edit/:id', async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  res.render('edit', { booking });
});

// xl dat cho~
app.post('/edit/:id', async (req, res) => {
  const { customerName, date, time } = req.body;
  await Booking.findByIdAndUpdate(req.params.id, { customerName, date, time });
  res.redirect('/');
});

//huy? cho~
app.post('/cancel/:id', async (req, res) => {
  await Booking.findByIdAndUpdate(req.params.id, { status: 'Cancelled' });
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
