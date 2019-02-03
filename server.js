////////////////////////////////
/* setups */

let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

/* database */
let dataBase = mongoose.connect('mongodb://localhost/Dragons',
{ useNewUrlParser: true });

/* imports */
let Dragon = require('./model/dragons');
let WishList = require('./model/wishlist');

/* middelware */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

/* listening port */
app.listen(3030, function() {
  console.log("We are up and running on PORT: 3030");
});

//Allow all requests from all domains & localhost
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET");
  next();
});

////////////////////////////////


/* POST DRAGON */
app.post('/dragons', function(req, res) {
  let dragon = new Dragon();

  dragon.dragonName = req.body.dragonName;
  dragon.dragonPower = req.body.dragonPower;
  dragon.save(function(err, savedDragons) {
    if (err) {
      res.status(500).send({
        error: "No dragon spawned"
      });
    } else {
      res.status(200).send(savedDragons);
    }
  });
});

/* GET DRAGON */
app.get('/dragons', function(req, res) {
  Dragon.find({}, function(err, dragons) {
    if (err) {
      res.status(500).send({
        error: "Could not fetch dragons"
      });
    } else {
      res.status(200).send(dragons);
    }
  });
});

/* GET WISHLIST */
app.get('/wishlist', function(request, response) {
   WishList.find({}).populate({path:'dragons', model: 'Dragon'}).exec(function(err, wishLists) {
       if (err) {
           response.status(500).send({error:"No wishlist to fetch"});
       } else {
           response.status(200).send(wishLists);
       }
   })
});

/* POST WISHLIST */
app.post('/wishlist', function(req, res) {
  let wishList = new WishList();
  wishList.title = req.body.title;

  wishList.save(function(err, newWishList) {
    if (err) {
      res.status(500).send({error: "Dragon wish list not created"});
    } else {
      res.send(newWishList);
    }
  });
});

/* PUT WISHLIST */
app.put('/wishlist/dragons/add', function(request, response) {
   Dragon.findOne({_id: request.body.dragonId}, function(err, dragon) {
       if (err) {
           response.status(500).send({error:"Could not add dragon to wishlist"});
       } else {
           WishList.updateOne({_id:request.body.wishListId}, {$addToSet: {dragons: dragon._id}}, function(err, wishList) {
               if (err) {
                   response.status(500).send({error:"Could not add dragon to wishlist"});
               } else {
                   response.send("Dragon added to wishlist - ROAR");
               }
           });
       }
   });
});
