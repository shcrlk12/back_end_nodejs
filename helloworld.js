const express = require('express');
const dataBase = require('./lib/dataBase.js')
const url = require('url');
const app = express();
const mysql = require('mysql');
var cors = require('cors');
var bodyParser = require('body-parser')

app.use(cors());
app.use(express.json())

/*******************
****database start**
******************** */
const connection = mysql.createConnection({
    host : 'localhost',
    port : 3401,
    user : 'root',
    password : 'kjw!@#2624959',
    database : 'kjwon_db001'
  });


connection.connect();

const dbSelect = (cd) => {
  connection.query('SELECT * FROM blogData', (err, results, fields) => {

  if(err)
  {
    console.log(err);
  }
  else{
    console.log(results);
    cd(results);
  }
});}

const dbInsert = (title, cd) => {
  var qwerasdf = `insert into blogData (_title, _modify_data) values ("${title}", DATE_FORMAT(now(), '%Y년 %m월 %d일 %H:%i'))`;

  connection.query(qwerasdf, (err, results, fields) => {

  if(err)
  {
    console.log(err);
    cd('Error!');
  }
  else{
    console.log(results);
    cd('Success!');
  }
});}

const dbRowDelete = (id, cb) => {
  connection.query(`DELETE FROM blogData where _id = ${id}`, (err, results, fields) => {

  if(err)
  {
    console.log(err);
  }
  else{
    console.log(results);
    cb('OK!');
  }
});}

const dbRowDataUpdate = (id, data, cb) => {
  connection.query(`UPDATE blogData SET _data = "${data}", _modify_data = DATE_FORMAT(now(), '%Y년 %m월 %d일 %H:%i') WHERE _id = ${id};`, (err, results, fields) => {

  if(err)
  {
    console.log(err);
  }
  else{
    console.log(results);
    cb('OK!');
  }
});}

const dbRowLikeUpdate = (id, like, cb) => {
  connection.query(`UPDATE blogData SET _like = "${like}" WHERE _id = ${id};`, (err, results, fields) => {

  if(err)
  {
    console.log(err);
  }
  else{
    console.log(results);
    cb('OK!');
  }
});}

// connection.end();

/*******************
****database end**
******************** */

// const cors = require('cors');
let users = [{
    id : 0,
    title:"Lorem ipsum dolor sit amet.",
    data: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ligula sapien, rutrum sed vestibulum eget, rhoncus ac erat. Aliquam erat volutpat. Sed convallis scelerisque enim at fermentum. Aliquam consectetur, est ac auctor iaculis, odio mi bibendum leo, in congue neque velit vel enim. Nullam vitae justo at mauris sodales feugiat. Praesent pellentesque ipsum eget tellus imperdiet ultrices. Sed ultricies nisi nec diam sodales fringilla. Quisque adipiscing cursus porta. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam bibendum scelerisque elit, eu pharetra dui pulvinar eget. Nam mollis mauris id tellus ultricies at porttitor neque vulputate. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.`,
    like: 0,
    modify_date:"2021년 4월 20일"
  },
  {
    id : 1,
    title:"Quisque sed lorem a dolor.",
    data :`Aenean non interdum neque. Vivamus id felis lacinia, vestibulum justo ut, lobortis tellus. Ut sollicitudin non sapien a scelerisque. Suspendisse mi diam, dapibus ut nisl nec, blandit egestas erat. Duis pulvinar aliquet odio, non imperdiet ligula ornare a. Nam at vestibulum sapien. Aliquam nisi diam, scelerisque at placerat vel, interdum vitae purus.

Maecenas massa justo, mattis vitae ipsum eu, consectetur consequat erat. Cras non tempus diam. Mauris nec maximus velit. Ut sollicitudin nibh id sem faucibus lobortis. Fusce leo lacus, eleifend vitae risus eget, vehicula dictum felis. Vestibulum non quam justo. Vivamus lobortis sapien vitae sem ultrices cursus. Nam vulputate et purus ac ullamcorper. Quisque sit amet iaculis arcu.`,
    like: 0,
    modify_date:"2021년 5월 12일"
  },
  {
    id : 2,
    title:"Nulla a felis at urna.",
    data: `Cras ultricies nunc vel convallis maximus. Ut rhoncus vehicula imperdiet. Etiam tincidunt dui et tortor convallis, sed interdum diam elementum. Donec ornare sapien a tristique luctus. Nam pretium, odio in pellentesque feugiat, erat nisi consectetur diam, eget maximus nisl ligula ac turpis. Curabitur cursus nibh nec dolor auctor semper. Aliquam congue in urna id pretium. Morbi in leo vel urna imperdiet cursus. Curabitur sollicitudin purus eu lacinia sagittis. Integer vitae odio lacus. Suspendisse accumsan nulla diam, ut congue ex interdum eget.`,
    like: 3,
    modify_date:"2021년 3월 4일"
  }
];

const user_loing = [
  {
    id: 'shcrlk12',
    pass : "kjw!@#2624959"
  }
];

app.get('/read/blogData', (req, res) => {
  dbSelect((results)=>{
    res.send(results)
  });
});

app.post('/create/blogData', (req, res) => {//request 로 받아서 title에 넣어야함.

  console.log(req.body['title']);

  dbInsert(req.body['title'], (msg)=>{
    res.send(msg)
  });
});

app.post('/update/blogData', (req, res) => {
  dbRowDataUpdate(req.body.Id, req.body.data, (str)=>{
    res.send(str);
  });
});

app.post('/update/blogLikeNumber', (req, res) => {
  dbRowLikeUpdate(req.body.Id, req.body.like, (str)=>{
    res.send(str);
  });
});

app.post('/delete/blogData', (req, res) => {

  console.log(req.body.deleteId);
  
  dbRowDelete(req.body.deleteId, (str)=>{
    res.send(str);
  });
});

app.get('/users', (req, res) => {

  return res.json(users);
});
//보류
app.get('/users/login', (req, res) => {
  var urlObject = url.parse(req.url, true).query;
  if(urlObject.id === user_loing[0].id)
    if(urlObject.pass === user_loing[0].pass)
    {
      res.setHeader("Access-Control-Allow-Origin", "*");
      return res.json(user = {token : 1});
    }
    return res.json(user = {token : 0});
});

app.listen(8888, () => {
});

// app.use(cors());
