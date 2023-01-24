const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

const uri =
  'mongodb+srv://pavan:PAVANteja1234@cluster0.lk4yx00.mongodb.net/formData';

mongoose.set('strictQuery', true);

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to mongoDB');
  } catch (error) {
    console.error(error);
  }
}

connect();

const notesSchema = {
  title: String,
  content: String
};

const Note = mongoose.model('Note', notesSchema);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', function (req, res) {
  let newNote = new Note({
    title: req.body.title,
    content: req.body.content
  });
  newNote.save();
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('server is running');
});
