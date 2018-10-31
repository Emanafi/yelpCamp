const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.send('this will be the landing page soon');
})


app.listen(3000, ()=> {
	console.log('The YelpCamp server has started!');
})