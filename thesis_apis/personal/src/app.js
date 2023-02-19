require("dotenv").config();
const express = require('express')
const mongoose = require('mongoose');
var cors = require('cors');

const app = express();
app.use(cors());

const PersonalInfo = require('./models/personal_info');
let personalInfoObj = {
  uniqueId: "sazzad",
  name: "Sazzadul Alam Ibrahim",
  age: 30,
  qualification: "MSc. in ICE"
}
app.get('/', (req, res) => {
  res.send({message: 'personal info app!'});
})

const createInitialPersonalInfo = () => {
  const personalInfo = new PersonalInfo(personalInfoObj);
  // Save Personal Info in the database
  personalInfo.save(personalInfo)
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
    createInitialPersonalInfo();
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.get('/api/personal-info/:uniqueId', (req, res) => {
  const uniqueId = req.params.uniqueId;

  PersonalInfo.findOne({uniqueId})
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Personal Info with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Personal Info with id=" + id });
    });
});

const PORT = process.env.NODE_DOCKER_PORT || 8081;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})