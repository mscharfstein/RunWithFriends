const db = require('./server/db');
const Promise = require('bluebird');

const User = db.models.user;
const Run = db.models.run;
const DatePref = db.models.datePref;
const City = db.models.city;
const Neighborhood = db.models.neighborhood

const users = [
  {name: 'Michelle Scharfstein', age: 25, email: 'michelle.scharfstein@gmail.com', password: 'GraceHopper!', phone: 2168700516, city: 'New York City', prefNeighborhoods: ['Williamsburg'], prefDist: 4, prefSpeed: 9, prefAge: 25, prefGender: 'either'},
  {name: 'Julia Scharfstein', age: 21, email: 'jscharf614@gmail.com', password: 'password', phone: '2168709580', city: 'New York City', prefNeighborhoods: ['Lower East Side', 'Williamsburg'], prefDist: 3.5, prefSpeed: 10, prefGender: 'either'},
]

const cities = [
	{name: 'New York City'},
	{name: 'Chicago'},
]

const newYorkNeighborhoods = [
	{name: 'Williamsburg'},
	{name: 'East Village'},
	{name: 'Upper East Side'},
	{name: 'Upper West Side'},
	{name: 'Soho'},
	{name: 'West Village'},
	{name: 'West Side Highway'}
]

const seed = () => {
	var allUsers = users.map(user => { User.create(user) });
	console.log('allUsers', allUsers)
	var allCities = cities.map(city => { City.create(city)})
	var allNewYorkNeigh = newYorkNeighborhoods.map(neighborhood => {Neighborhood.create(neighborhood)})
	 	return Promise.all(allUsers.concat(allCities).concat(allNewYorkNeigh))
					.then((promises) => {
						console.log('promises', promises)

						return City.findOne({
							where: {
								name: 'New York City'
							}
						})
						.then(city => {
							console.log('city', city)
							return Neighborhood.findAll()
							.then(neighborhoods => {
								console.log('neighborhoods', neighborhoods)
								return neighborhoods.map(hood => {
									city.addNeighborhood(hood)
								})
							})
						})
					})
					.then(() => console.log('got here'))
          .catch(console.log(new Error('error')))
}

const main = () => {
	console.log('Syncing db...');
	db.sync({ force: true })
		.then(() => {
			return seed()
			console.log('Seeding database...');
		}).catch(err => {
			console.log('Error while seeding');
			console.log(err.stack);
		}).then(() => {
			console.log("Done seeding");
			//db.close();
			return null;
		});
}

main();
