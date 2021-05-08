const express = require('express');
const app = express();
// const cors = require('cors');
let users = [{
    id: 1,
    name: 'Hyun'
  },
  {
    id: 2,
    name: 'Alice'
  },
  {
    id: 3,
    name: 'Kelly'
  }
];

app.get('/', (req, res) => {
  res.send("hellow world");
});

app.get('/users', (req, res) => {

  return res.json(users);
});

app.listen(8888, () => {
  console.log("test");
});

// app.use(cors());
