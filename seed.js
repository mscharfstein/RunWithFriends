const db = require('./server/db');
const Promise = require('bluebird');

const User = db.models.user;
const Run = db.models.run;
const DatePref = db.models.datePref;
const City = db.models.city;
const Neighborhood = db.models.neighborhood
const Profile = db.models.profile

const profiles = [
  {firstName: 'Michelle', lastName: 'Scharfstein', age: 25, phone: '+12168700516', city: 'New York City', prefNeighborhoods: ['Williamsburg'], prefDist: 4, prefSpeed: '8-9', prefWeekdayTime: ['Early Morning'], prefWeekendTime: ['Early Morning']},
	{firstName: 'Julia', lastName: 'Scharfstein', age: 21, phone: '+12168700516', city: 'New York City', prefNeighborhoods: ['Williamsburg','East Village'], prefDist: 4, prefSpeed: '8-9', prefWeekdayTime: ['Early Morning'], prefWeekendTime: ['Early Morning']},
	{firstName: 'Allison', lastName: 'Scharfstein', age: 27, phone: '+12168700516', city: 'New York City', prefNeighborhoods: ['Williamsburg','Upper East Side'], prefDist: 3, prefSpeed: '8-9', prefWeekdayTime: ['Early Morning','Morning'], prefWeekendTime: ['Early Morning','Mid-day']},
	{firstName: 'Jonathan', lastName: 'Scharfstein', age: 50, phone: '+12168700516', city: 'New York City', prefNeighborhoods: ['East Village','Upper East Side'], prefDist: 2.5, prefSpeed: '8-9', prefWeekdayTime: ['Early Morning','Morning'], prefWeekendTime: ['Early Morning','Mid-day']},
	{firstName: 'Suzanne', lastName: 'Scharfstein', age: 50, phone: '+12168700516', city: 'New York City', prefNeighborhoods: ['East Village','Upper East Side'], prefDist: 3.5, prefSpeed: '8-9', prefWeekdayTime: ['Early Morning','Morning'], prefWeekendTime: ['Early Morning','Morning']}
]

const users = [
  {email: 'michelle@gmail.com', password: 'michelle', profileId: 1},
	{email: 'julia@gmail.com', password: 'julia', profileId: 2},
	{email: 'allison@gmail.com', password: 'allison', profileId: 3},
	{email: 'jonathan@gmail.com', password: 'jonathan', profileId: 4},
	{email: 'suzanne@gmail.com', password: 'suzanne', profileId: 5}
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

const runs = [
	{dist: 4, speed: '8:30', date: new Date(Date.now()), status: "Completed", rating: 4, profileId: 1, partnerId: 2, neighborhood: 'East Village'},
	{dist: 4, speed: '8:30', date: new Date(Date.now()), status: "Completed", rating: 4, profileId: 2, partnerId: 1, neighborhood: 'East Village'},

	{dist: 5, speed: '8:45', date: new Date(Date.now()), status: "Completed", rating: 3, profileId: 3, partnerId: 4, neighborhood: 'Williamsburg'},
	{dist: 5, speed: '8:45', date: new Date(Date.now()), status: "Completed", rating: 5, profileId: 4, partnerId: 3, neighborhood: 'Williamsburg'},

	{dist: 3, speed: '9:45', date: new Date(Date.now()), status: "Completed", rating: 5, profileId: 5, partnerId: 3, neighborhood: 'Williamsburg'},
	{dist: 3, speed: '9:45', date: new Date(Date.now()), status: "Completed", rating: 4, profileId: 3, partnerId: 5, neighborhood: 'Williamsburg'}
]

const seed = () => {
	var allProfiles = profiles.map(profile => {Profile.create(profile)})
	var allUsers = users.map(user => { User.create(user) });
	var allCities = cities.map(city => { City.create(city)})
	var allNewYorkNeigh = newYorkNeighborhoods.map(neighborhood => {Neighborhood.create(neighborhood)})
	var allRuns = runs.map(run => {Run.create(run)})

	 	return Promise.all(allUsers.concat(allCities).concat(allNewYorkNeigh).concat(allRuns).concat(allProfiles))
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
