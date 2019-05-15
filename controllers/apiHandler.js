const request = require('request');

const MongoClient = require('mongodb').MongoClient;
const CONNECTION_STRING = process.env.DB;

const connect = require('./Connection.js');

const CSE_ID = '010956588550014475027:_hryxut5pmu';
const API_KEY = 'AIzaSyBX-pC320yw34O9ZF7bhj11mRJimjBLB4I';
const ROOT_URL = 'https://www.googleapis.com/customsearch/v1?';


class ApiHandler {
  
  getData(search, num, callback) {
    const page = !num ? 1 : num;
    const url = `${ROOT_URL}key=${API_KEY}&cx=${CSE_ID}&searchType=image&q=${search}&start=${page}`;
    request(url, (err, response, body) => {
      if(!err & response.statusCode == 200) {
        let data = JSON.parse(body);
        let items = data.items;
        return callback(items);
      } else {
        let dataLimit = JSON.parse(response.body)
        console.log(dataLimit)
        return callback(dataLimit);
      }
    });
  }
  
  
}

module.exports = ApiHandler;