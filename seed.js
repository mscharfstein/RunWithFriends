const db = require('./server/db');
const Promise = require('bluebird');

const User = db.models.user;
const Run = db.models.run;
const DatePref = db.models.datePref;

const users = [
  {name: 'Michelle Scharfstein', age: 25, email: 'michelle.scharfstein@gmail.com', password: 'GraceHopper!', phone: 2168700516, city: 'New York City', prefNeighborhoods: ['Williamsburg'], prefDist: 4, prefSpeed: 9, prefAge: 25, prefGender: 'either'},
  {name: 'Julia Scharfstein', age: 21, email: 'jscharf614@gmail.com', password: 'password', phone: '2168709580', city: 'New York City', prefNeighborhoods: ['Lower East Side', 'Williamsburg'], prefDist: 3.5, prefSpeed: 10, prefGender: 'either'},
]


const seed = () => {
	var allUsers = users.map(user => { User.create(user) });
	return Promise.all(allUsers)
					.then((users) => {
						console.log('here are the users', users)
          })
          .catch(console.log(new Error('error')))
}

const main = () => {
	console.log('Syncing db...');
	db.sync({ force: true })
		.then(() => {
			console.log('Seeding database...');
			return seed();
		}).catch(err => {
			console.log('Error while seeding');
			console.log(err.stack);
		}).then(() => {
			console.log("Done seeding");
			db.close();
			return null;
		});
}

main();
