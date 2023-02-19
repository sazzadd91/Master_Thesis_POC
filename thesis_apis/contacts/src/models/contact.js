const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema({
    uniqueId: String,
    name: String,
    email: String,
    phone: String,
    address: String
});
contactSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
module.exports = mongoose.model('Contact', contactSchema);