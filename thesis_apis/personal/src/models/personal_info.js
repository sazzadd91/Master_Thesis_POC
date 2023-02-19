const mongoose = require('mongoose');
const personalInfoSchema = new mongoose.Schema({
    uniqueId: String,
    name: String,
    age: Number,
    qualification: String
},
{ timestamps: true });
personalInfoSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
module.exports = mongoose.model('personalInfo', personalInfoSchema);
