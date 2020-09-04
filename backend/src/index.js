const express = require('express');
const cors = require('cors');
const app = express();

require('./database');

//Usamos cors, solo en Desarrollo.
app.use(cors());
app.use(express.json());
app.use('/api', require('./routes/index') );

app.listen(3000);
console.log('Puerto Usado: ', 3000);