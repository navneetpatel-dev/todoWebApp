const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); 

const dbService = require('./server/dbservices');
const db = dbService.getDbServiceInstance();

const {post_data, get_data, delete_data, mark_complete, edit_data} = require('./server/app');

app.post('/addItems',post_data);
app.get('/getItems',get_data);
app.patch('/edit/:id',edit_data);
app.patch('/complete/:id',mark_complete);
app.delete('/deleteItem/:id',delete_data);

/* #### LISTEN ON PORT #### */

app.listen(8000, () => console.log('app is running'));
