const ApiHandler = require('../controllers/apiHandler.js');

module.exports = function(app, db) {
  
  const retrieveAPI = new ApiHandler(); //apiHandler is a class
  
  app.get("/api/search/:word", (req, res) => {
    const { word } = req.params;
    let { offset } = req.query;
    let itemData = [];

    if(offset > 1) {
      offset = (10 * offset + 1) - 10;
    }
    
    
    
    retrieveAPI.getData(word, offset, (datas) => {
      if(datas.length > 1) {
        datas.forEach(data => {
          itemData.push({
            url: data.link,
            snippet: data.snippet,
            thumbnail: data.image.thumbnailLink,
            context: data.image.contextLink
          });
        });
        let date = new Date();
        
        //input data history in mongodb
        db.production.collection('history').insertOne({
          term: word,
          when: date
        });
        
        res.json(itemData);
      } else {
        res.json(datas);
      }
      
    });
    
  });
  
  app.get("/api/latest/search", (req, res) => {
    
    db.production.collection('history')
      .find()
      .sort({when: -1})
      .limit(10)
      .project({_id: 0})
      .toArray((err, docs) => {
        if(err) console.log(err)
        res.json(docs)
      });
    
  });
  
}