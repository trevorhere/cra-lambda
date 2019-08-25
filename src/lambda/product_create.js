
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const uri = "mongodb+srv://admin:" + process.env.DB_PASSWORD + "@cluster0-mcmuo.mongodb.net/test?retryWrites=true&w=majority";
export async function handler(event, context) {

  try {

    // var obj = JSON.parse(event.body)

    getResults();

    console.log('test', JSON.parse(event.body))

  //   var obj = JSON.parse(event.body)

  //   await MongoClient.connect(uri, function(err, client) {
  //     if(err) {
  //       console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
  //     }
  //     console.log('Connected...');
  //     const collection = client.db("db_tasks").collection("collection_tasks");
  //     // perform actions on the collection object


  //     collection.insertOne({
  //       name: obj.msg,
  //       created_at: '08/22/19',
  //       assigned_to: 'trevoranthonylane@gmail.com',
  //     })

  //     console.log('test..')
  // })



  // console.log('test...')


    return {
      statusCode: 200,
      body: JSON.stringify({ msg: 'scooop' })
    }
  } catch (err) {
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    }
  }
}

const getResults = async () => {
  const {client, collection} = await getClient()
  const result = collection.find({}).toArray()
  client.close()
  return result  
}

const getClient = () => new Promise((resolve, reject) => {
  const client = new MongoClient(uri, {useNewUrlParser:true})

  client.connect().then((client) => {
    const db = client.db('db_tasks')
    const collection = db.collection('collection_tasks')

      collection.insertOne({
        name: 'test',
        created_at: '08/22/19',
        assigned_to: 'trevoranthonylane@gmail.com',
      })


    resolve({client, db, collection})
  }).catch(reason => reject(reason))
})


