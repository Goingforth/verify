const express = require("express");
const app = express();

const morgan = require('morgan')
const mongoose = require('mongoose');
//const methodOverride = require('method-override');

require('dotenv').config();


const registrationRoutes = require("./routes/registration-route");
const loginRoutes = require("./routes/login-route");
const listRoutes = require("./routes/list-route");




mongoose
    .connect(process.env.MONGO_URL)
    .then((res) => console.log('Connected to DB'))
    .catch((error) => console.log(error));

app.listen(process.env.PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${process.env.PORT}`);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: false }));

// app.use(express.static('styles'));

// app.use(methodOverride('_method'));
//app.use(methodOverride('_method'));

app.get('/', (req, res) => {

    // const title = 'Home';
    // res.render(createPath('index'), { title });
    res.send("Server Ok!");
    res.end();
});

app.use(registrationRoutes);
app.use(loginRoutes);
app.use(listRoutes);


app.use((req, res) => {
    res
        .status(404)
        .send("ERROR 404")
        .end()
});










