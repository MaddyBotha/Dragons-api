/* setups */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

let wishList = new Schema({
  title: {type: String, default: "Dragon's Wish List"},
  dragons: [{type: ObjectId, ref: 'Dragon'}]
});

/* exports */

module.exports = mongoose.model('WishList', wishList);


// 5c571337554d3d0e2cbcd5bf - Loki's List

// 5c56fca6dead812de092cc68 - Fluffykins
