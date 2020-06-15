const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const database = {
	users: [
		{
			id: '123',
			name: 'John',
			email: 'john@gmail.com',
			password: 'cookies',
			entries: 0,
			joined: new Date()
		},
		{
			id: '124',
			name: 'Sally',
			email: 'sally@gmail.com',
			password: 'bananas',
			entries: 0,
			joined: new Date()
		},
	]
}

app.use(bodyParser.json());

app.get('/', (req,res) => {
	res.send(database.users);
})

app.post('/signin', (req, res) => {
	if (req.body.email === database.users[0].email &&
		req.body.password === database.users[0].password) {
		res.json('successful');
	}
	else {
		res.status(400).json('validation error');
	}
	res.json('signing in');
})

app.post('/register', (req, res) => {
	const {email, name, password} = req.body;
	database.users.push(
		{
			id: '125',
			name: name,
			email: email,
			password: password,
			entries: 0,
			joined: new Date()
		})
	res.json(database.users[database.users.length-1]);
})

// signin --> POST (will be successful or fail)
//      Using POST because you want to send password by HTTPS
// register --> POST (will return new user)
// profile --> userId GET (will return the user)
// count --> PUT (updates number of images submitted)

app.listen(3000, () => {
	console.log('App running on Port 3000')
})