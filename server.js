const express = require('express');
const app = express();

//parse incoming url encoded form data
//and populate the req.body object

app.use(express.json());

//allow cross origin requests
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use( (req, res, next) => {
	res.header("Access_Control_Allow_Origin", "*");
	res.header("Access_Control_Allow_Headers", "Origin, x-requested-With, Content-Type, Accept");
	next();
});

/**************
*   DATABASE  *
***************/
const db = require('./models/index.js');


/**************
*    ROUTES   *
***************/

//Serve static files from the '/public' directory:
//i.e. '/images', '/scripts', '/styles'
app.use(express.static('public'));

// HTML Endpoints
app.get('/', (req, res) => {
	res.sendFile(__dirNname + 'views/index.html');
})


app.listen(3000, ()=> {
	console.log('The YelpCamp server has started!');
})