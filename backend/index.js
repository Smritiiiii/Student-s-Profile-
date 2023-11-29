const express = require ('express');
const cors = require('cors');//connection
const mongoose = require('mongoose');//db
const bodyParser = require('body-parser');//report
const dotenv = require('dotenv');
// const multer = require('multer'); 
const path = require('path');

dotenv.config();//env
const app = express();


//middleware 
app.use(express.json());
app.use(cors(
    {
        origin: "http://localhost:3000", 
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      }
));
app.use(bodyParser.json());


//connect to db for user authentication
mongoose
.connect("mongodb://127.0.0.1:27017/profile")
    .then(() => console.log("Connected to db"))
    .catch((err) => console.log(err.message))




    
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/adminRoutes')
const markRoutes = require('./routes/markRoutes');
const achievementsRoutes = require('./routes/achievementsRoutes');
const infoRoutes = require('./routes/infoRoutes');

const admininfoRoutes = require('./routes/admininfoRoutes')
const dataRoutes = require('./routes/dataRoutes')






app.use('/auth', userRoutes);
app.use('/api', adminRoutes);
app.use('/marks', markRoutes);
app.use('/achievements',achievementsRoutes);
app.use('/info', infoRoutes);
app.use('/data',admininfoRoutes)
app.use('/',dataRoutes)




app.use(express.static("public"));

 



app.listen(9002,()=> {
    console.log("Port 9002 is running");
})

