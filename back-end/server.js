const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/museum', {
  useNewUrlParser: true
});
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});
const itemSchema = new mongoose.Schema({
  name: String,
  type_one: String,
  type_two: String,
  height: String,
  weight: String,
  hp: String,
  attack: String,
  sp_attack: String,
  defense: String,
  sp_defense: String,
  move1: String,
  move2: String, 
  move3: String,
  move4: String,
  path: String,
});
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});
// Create a model for items in the museum.
const Item = mongoose.model('Item', itemSchema);
app.post('/api/items', async (req, res) => {
  const item = new Item({
    name: req.body.name,
    type_one: req.body.type_one,
    type_two: req.body.type_two,
    height: req.body.height,
    weight: req.body.weight,
    hp: req.body.hp,
    attack: req.body.attack,
    sp_attack: req.body.sp_attack,
    defense: req.body.defense,
    sp_defense: req.body.sp_defense,
    move1: req.body.move1,
    move2: req.body.move2,
    move3: req.body.move3,
    move4: req.body.move4,

    path: req.body.path,
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
app.get('/api/items', async (req, res) => {
  try {
    let items = await Item.find();
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.listen(3000, () => console.log('Server listening on port 3000!'));
