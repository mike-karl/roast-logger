const mongoose = require('mongoose')

exports.connect = () => {
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on('error', (error) => { console.error(error); process.exit(1); });
db.once('open', () => console.log('Connected to Database'));
}