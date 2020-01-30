const Joi = require('joi');
const MongoClient = require('mongodb').MongoClient;

const url = `mongodb://test01:${encodeURIComponent('a@123456')}@103.74.122.87:27000`;