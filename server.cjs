const express = require('express');
const password = require('./backend/password.api.cjs');
const users = require('./backend/user.api.cjs')
const share = require('./backend/share.api.cjs')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const path = require('path')

const app = express();


const mongoDBEndpoint = 'mongodb+srv://yuanshen:7895123a@webdev.f4kp8kb.mongodb.net/?retryWrites=true&w=majority&appName=WebDev'
mongoose.connect(mongoDBEndpoint, {
    useNewUrlParser: true,
})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/password', password);
app.use('/api/users', users);
app.use('/api/share', share)
// app.get('/', function(req, res) {
//     res.send("This is the FIRST GET request")
// });

// app.get('/', function(request, response) {
//     response.send("This is SECOND GET request");
// })

// app.put('/', function(request, response) {
//     response.send("This is a PUT request")
// })


let frontend_dir = path.join(__dirname, 'dist')

app.use(express.static(frontend_dir));
app.get('*', function (req, res) {
    console.log("received request");
    res.sendFile(path.join(frontend_dir, "index.html"));
});

app.listen(process.env.PORT || 8000, function() {
    console.log("Starting app now...")
})