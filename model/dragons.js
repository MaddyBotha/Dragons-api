/* setups */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

/* Dragon Schema */
let dragon = new Schema({
  dragonName: String,
  dragonPower: String,
  likes: {type: Number, default: 0},
});

module.exports = mongoose.model('Dragon', dragon);
