const MongoClient = require('mongodb').MongoClient;
const CONNECTION_STRING = process.env.DB;

function connect(url) {
  return MongoClient.connect(url, { useNewUrlParser: true })
    .then(client => client.db('search_history'))
}
  
module.exports = async function() {
  let db = await Promise.resolve(connect(CONNECTION_STRING));
  
  return {
    production: db
  }
}

  
  

