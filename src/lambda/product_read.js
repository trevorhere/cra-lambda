var co = require('co');
var mongoose = require('mongoose');
require('dotenv').config()


let conn = null;

// const uri = 'mongodb://admin:password@mongourl:port/databaseName';
const uri = "mongodb+srv://admin:"+ process.env.DB_PASSWORD +"@cluster0-mcmuo.mongodb.net/test?retryWrites=true&w=majority";

exports.handler = function(event, context, callback) {

  context.callbackWaitsForEmptyEventLoop = false;

  run()
    .then(res => {
      callback(null, res);
    })
    .catch(error => callback(error));
};

function run() {
  return co(function*() {

    if (conn == null) {
      conn = yield mongoose.createConnection(uri, {
        bufferCommands: false,
        bufferMaxEntries: 0
      });
      conn.model('collectionName', new mongoose.Schema({
        schedule: String,
        occupancy: Number,
        count: Number,
        price: Number,
        time: String,
        link: String
      }));
    }

    const M = conn.model('collectionName');

    const doc = yield M.find();
    const response = {
      statusCode: 200,
      body: JSON.stringify(doc)
    };
    return response;
  });
}