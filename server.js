const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbconfig = require('./config/database.config');


let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



mongoose.Promise = global.Promise;

mongoose.connect(dbconfig.url).then(() => {
    console.log('Database connected Succsfully');
}).catch((err)=>{
    console.log('Could not connect to the database', err);
    process.exit();
})



app.get('/', (req, res) => {

    res.send('Welcome to the easy notes');

}
);


let port = 4444 | process.env.PORT;

require('./Routes/notes.routes')(app);

app.listen(port, ()=>{
    console.log('Server is started at ', port);
});