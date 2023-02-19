require("dotenv").config();
const express = require('express')
const mongoose = require('mongoose');
var cors = require('cors');

const app = express();
app.use(cors());

const Contact = require('./models/contact');
let contactObj = {
    uniqueId: "sazzad",
    email: "ibsazzadd@gmail.com",
    phone: "+491794180299",
    address: "Berlin, Germany"
}
app.get('/', (req, res) => {
  res.send({message: 'contact app!'})
})

const createInitialContact = () => {
    const contact = new Contact(contactObj);
    // Save Contact in the database
    contact.save(contact)
}
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_NAME = process.env.DB_NAME || 'db_thesis';
mongoose.Promise = global.Promise;
mongoose
  .connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
    createInitialContact();
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.get('/api/contact/:uniqueId', (req, res) => {
  const uniqueId = req.params.uniqueId;

  Contact.findOne({uniqueId})
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Contact with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Contact with id=" + id });
    });
});
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})