const mongoose = require('mongoose');

const ResponseSchema = new mongoose.Schema({
  greyMatter: [
      {
          type: String,
      }
  ],
  rackYB: [
    {
        type: String,
    }
],
languageRiot: [
  {
      type: String,
  }
],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
},
name: {
  type: String
}
});

const Response = mongoose.model('Response', ResponseSchema);

module.exports = Response;
