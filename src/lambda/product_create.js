// import axios from "axios"
// var co = require('co');
const MongoClient = require('mongodb').MongoClient;
// var mongoose = require('mongoose');
// require('dotenv').config()



// let conn = null;

// // const uri = 'mongodb://admin:" + process.env.DB_PASSWORD + "@mongourl:port/"db_tasks";
// const uri = "mongodb+srv://admin:"+ process.env.DB_PASSWORD +"@cluster0-mcmuo.mongodb.net/test?retryWrites=true&w=majority";

// exports.handler = function(event, context, callback) {

//   context.callbackWaitsForEmptyEventLoop = false;

//   run()
//     .then(res => {
//       callback(null, res);
//     })
//     .catch(error => callback(error));
// };

// function run() {
//   return co(function*() {

//     // if (conn == null) {
//     //   conn = yield mongoose.createConnection(uri, {
//     //     bufferCommands: false,
//     //     bufferMaxEntries: 0
//     //   });
//     // }
    
//     // conn.collection('collection_tasks').insertOne({
//     //   name: 'canvas',
//     //   created_at: '08/22/19',
//     //   assigned_to: 'trevoranthonylane@gmail.com',
//     // });



//     const response = {
//       statusCode: 200,
//       body: JSON.stringify('stuff is good')
//     };
//     return response;
//   });
// }


// replace the uri string with your connection string.


require('dotenv').config();

const uri = "mongodb+srv://admin:" + process.env.DB_PASSWORD + "@cluster0-mcmuo.mongodb.net/test?retryWrites=true&w=majority";


export async function handler(event, context) {

  try {

    console.log('test1', JSON.parse(event.body))
    var obj = JSON.parse(event.body)

    console.log('msg:', obj.msg)   

    await MongoClient.connect(uri, function(err, client) {
      if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
      }
      console.log('Connected...');
      const collection = client.db("db_tasks").collection("collection_tasks");
      // perform actions on the collection object
      collection.insertOne({
        name: obj.msg,
        created_at: '08/22/19',
        assigned_to: 'trevoranthonylane@gmail.com',
      })
      client.close();
  });

    return {
      statusCode: 200,
      body: JSON.stringify({ msg: uri })
    }
  } catch (err) {
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    }
  }
}
