//server side code
const express = require('express'); 
const path = require('path')
const bodyParser = require('body-parser')
const mustacheExpress = require('mustache-express');


const app = express ();
const PORT = process.env.PORT || 5000;


app.use(bodyParser.json())          //json support
app.use(bodyParser.urlencoded({    //url support
    extended: true
  })); 


app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname);
app.use(bodyParser.json())          //json support
app.use(bodyParser.urlencoded({    //url support
    extended: true
  })); 
app.use('/public', express.static('public'));

var { Client } = require('pg');
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl:true
});
client.connect();


var memories = [];

app.get('/', (req, res) => {
    client.query('SELECT * FROM memoryitem', (err, resSQL) => {
        if (err) {
          console.log(err.stack)
        } else {
            let memories = resSQL.rows
            res.render('public/index', {
                memories
            });
        }
      })
})

app.post('/post', function (req, res) {
    var text = req.body.userguess;
    if (text == " "){
        alert('please enter something');
    } else {
  
        client.query('INSERT INTO memoryitem (memory) VALUES ($1)', [text],  (err, res) => {
            if (err) { console.log(err)}
            else {
                console.log("posted successfully");
            }
         })
    }
    res.redirect('/');
})

  
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))