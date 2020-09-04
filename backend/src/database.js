const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/login',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    db => console.log('Database and DB is alive!')
).catch(
    err => console.log("Error Conectando: " + err)
);