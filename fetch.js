const mongoose = require('mongoose');
const url = `mongodb://test01:${encodeURIComponent('a@123456')}@103.74.122.87:27000`;

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
    if (err) throw err;
});

const conn = mongoose.connection;

const dataSchema = new mongoose.Schema({
    id: String,
    status: Number,
});

const dataModel = mongoose.model('Comment', dataSchema);

module.exports = { dataModel };