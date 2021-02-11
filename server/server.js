//entry point for server
//these require entries import the relevant bits from node_modules
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const { readdirSync } = require('fs');//access to file system
require('dotenv').config();

//import routes
//const authRoutes = require('./routes/auth');

//application: express is an app that executes a server
const app = express();

// database connection
//mongoose configuration options
//https://mongoosejs.com/docs/connections.html
/*
(node:11804) DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
(Use `node --trace-deprecation ...` to show where the warning was created)
 */
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,//mongoDB deprecated ensureIndex()
    useFindAndModify: true,
    useUnifiedTopology: true,
    useFindAndModify: false//overcome deprecation warning in api/create-or-update-user
})//promise comes back from connection
.then(() => {
    console.log("DB CONNECT SUCCESS");
})
.catch((error) => {
    console.log(`DB CONNECT ERROR: ${error}`);
});

//middleware: functions that run that provide features
app.use(morgan('dev'));//see status messages in terminal
app.use(bodyParser.json({limit: "2mb"}));
app.use(cors());


// route middleware, prefixing routes with api
//app.use('/api', authRoutes);
//auto load all routes under routes directory just like line above
readdirSync('./routes').map((rt) => app.use('/api',require("./routes/" + rt)));
//each route will have a corresponding controller method

//testing request response handler
// app.get('/api', (req, res) => {
//     res.json({
//         data: 'hey you hit node API updated again',
//     });
// });//get home page

// port to run app
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});