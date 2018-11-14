const express = require('express');
const app = express();
const ejs = require('ejs');

//parse incoming url encoded form data
//and populate the req.body object
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

//allow cross origin requests
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use( (req, res, next) => {
	res.header("Access_Control_Allow_Origin", "*");
	res.header("Access_Control_Allow_Headers", "Origin, x-requested-With, Content-Type, Accept");
	next();
});

/**************
*   DATABASE. *
**************/
	let campgrounds = [
		{
			name: 'Salmon Creek', 
			image: '/images/camp5.jpeg'
		},
		{
			name: 'Granite Hill',
			image: '/images/camp6.jpeg'
		},
		{
			name: 'Mountain Goats Rest',
			image: '/images/camp7.jpeg'
		},
		{
			name: 'Salmon Creek', 
			image: '/images/camp5.jpeg'
		},
		{
			name: 'Granite Hill',
			image: '/images/camp6.jpeg'
		},
		{
			name: 'Mountain Goats Rest',
			image: '/images/camp7.jpeg'
		}
	]

/**************
*    ROUTES   *
***************/

//Serve static files from the '/public' directory:
//i.e. '/images', '/scripts', '/styles'
app.use(express.static('public'));

// HTML Endpoints
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/views/index.html');
})

app.get('/campgrounds', (req, res) => {
	res.render(__dirname + '/views/campgrounds.ejs', {campgrounds:campgrounds});
});

app.get('/landing', (req, res) => {
	res.render(__dirname + '/views/landing.ejs');
});

app.post("/campgrounds", (req, res) => {
	//get data from form and add to campgrounds array
	let name = req.body.name;
	let image = req.body.image;
	let newCampground = {name: name, image: image}
	campgrounds.push(newCampground);
	//redirect back to campgrounds page
	res.redirect('/campgrounds');
});

app.get('/campgrounds/new', (req, res) => {
	res.render('new.ejs');
})


app.listen(3000, ()=> {
	console.log('The YelpCamp server has started!');
});