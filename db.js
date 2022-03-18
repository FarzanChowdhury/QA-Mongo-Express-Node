const mongoose = require("mongoose");
const schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/QACats");

const catSchema = new schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
  },
  breed: {
    type: String,
    required: true,
    minlength: 2,
  },
  age: {
    type: Number,
    required: true,
    min: 0,
    max: 25,
  },
});

module.exports = mongoose.model("Cat", catSchema);
