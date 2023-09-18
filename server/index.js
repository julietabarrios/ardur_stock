const express = require('express'),
    app = express(),
    PORT = process.env.PORT || 4000,
    mongoose = require('mongoose') 
require("dotenv").config()
mongoose.set('debug',true)

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(require("cors")())



async function connecting(){
    try {

        await mongoose.connect(process.env.MONGO)
        console.log('Connected to the DB')
    } catch ( error ) {
        console.log('ERROR: Seems like your DB is not running, please start it up !!!');
    }
}

app.use('/position', require('./routes/positionRoute'))



const path = require('path');

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

connecting().then(() => {
    app.listen(PORT, () => {
        console.log("listening for requests");
    })
})

//app.listen(PORT, () => console.log(`listening on port 4000`))