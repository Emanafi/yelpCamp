const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');

mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true })
  .then(() => console.log('Mongodb connected on port 27017...'))
  .catch((err) => console.log(`MongoDB connection error: ${err}`))


//parse incoming url encoded form data
//and populate the req.body object
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//allow cross origin requests
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use( (req, res, next) => {
	res.header("Access_Control_Allow_Origin", "*");
	res.header("Access_Control_Allow_Headers", "Origin, x-requested-With, Content-Type, Accept");
	next();
});

//SCHEMA setup
let campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

let Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
// 	{
// 		name: "Granite Hill",
// 		image: "https://images.unsplash.com/photo-1534950947221-dcaca2836ce8?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=66ea9efe055ecf8060af5676efac7deb&auto=format&fit=crop&w=3334&q=80",
// 		description:"This is a huge granite hill, no bathrooms. No water. Beautiful granite!"
// 	}, (err, campground) => {
// 		if(err) {
// 			console.log(err);
// 		} else {
// 			console.log(`Newly created campground: ${campground}`)
// 		}
// 	});

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
	Campground.find({}, (err, allCampgrounds) => {
		if(err) {
			console.log(`Error finding all campgrounds: ${err}`);
		} else {
			res.render(__dirname + '/views/index.ejs', {campgrounds: allCampgrounds});
			console.log(`Successfully rendered all campgrounds`);
		}
	})
});

app.get('/landing', (req, res) => {
	res.render(__dirname + '/views/landing.ejs');
});

app.post("/campgrounds", (req, res) => {
	//get data from form and add to campgrounds array
	let name = req.body.name;
	let image = req.body.image;
	let desc = req.body.description;
	let newCampground = {name: name, image: image, description: desc}

	//create a new campground and save to database
	Campground.create(newCampground, (err, newlyCreatedCampground) => {
		if(err) {
			console.log(err);
		} else {
			res.redirect("/campgrounds");
		}
	});
});

app.get('/campgrounds/new', (req, res) => {
	res.render('new.ejs');
});

app.get('/campgrounds/:id', (req, res) => {
	let objectID = req.params.id;

	Campground.findOne({_id: req.params.id}, (err, foundCampground) => {
		if(err) {
			console.log(`unable to show specific campground: ${err}`);
		} else {
			res.render(__dirname + '/views/show.ejs', {campground: foundCampground});
		}
	})
});


app.listen(3000, ()=> {
	console.log('The YelpCamp server has started!');
});