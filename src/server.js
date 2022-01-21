const env = require('dotenv').config();
const express = require('express');

class Database {
    constructor() {
      this._connect()
    }
  _connect() {
       mongoose.connect(process.env.MONGODB_URI,  { useNewUrlParser: true, useUnifiedTopology: true })
         .then(() => {
           console.log('Database connection successful')
         })
         .catch(err => {
           console.error(err)
         })
    }
};

const server = express();
const path = require('path');
server.listen(3000);
console.log('Server running on port 3000');
server.use(express.static(path.join(__dirname, 'public')));
server.get('/', (req, res) => {
    res.send('welcome to the homepage')
})
server.get('*', (req, res) => {
    res.send('404 NOT FOUND !')
})

server.get('/contacts/:id', (req, res) => {
  console.log("object")
  const id = ObjectID(req.params.id)
  db.collection('contactlist')
  .findOne({_id: id})
  .then((data) => res.send(data))
  .catch(err => res.send("cannot get contacts"))
});

server.post('/contacts', (req, res) => {
  const newContact = req.body
  db.collection("contactlist")
  .insertOne({...newContact})
  .then(res.send('contact added'))
  .catch(res.send('cannot add contact'))
})

server.delete("/contacts/:id", (req, res) => {
  const id = ObjectID(req.params.id)
  db.collection("contactlist")
  .findOneAndDelete({_id: id})
  .then(res.send("contact deleted"))
  .catch(res.send("cannot delete contact"))
})

server.put("/contacts/:id", (req, res) => {
  const id = ObjectID(req.params.id)
  const newContact = req.body
  console.log(id);
  db.collection("contactlist").findOneAndUpdate({_id: id },
     {
       $set: {...newContact}
  })
  .then(res.send("contact updated"))
  .catch(res.send("cannot update contact"))
  
});