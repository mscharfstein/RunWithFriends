const db = require('./server/db');
const Promise = require('bluebird');

const User = db.models.user;
const Run = db.models.run;
const DatePref = db.models.datePref;
const City = db.models.city;
const Neighborhood = db.models.neighborhood
const Profile = db.models.profile
const RunUserDetails = db.models.runUserDetails

const profiles = [
  {firstName: 'Michelle', lastName: 'Scharfstein', age: 25, phone: '+12168700516', city: 'New York City', prefNeighborhoods: ['Williamsburg','East Village'], prefDist: 4, prefSpeed: '8-9', prefWeekdayTime: ['Early Morning'], prefWeekendTime: ['Early Morning']},
	{firstName: 'Julia', lastName: 'Scharfstein', age: 21, phone: '+12168700516', city: 'New York City', prefNeighborhoods: ['Williamsburg','East Village'], prefDist: 4, prefSpeed: '8-9', prefWeekdayTime: ['Early Morning'], prefWeekendTime: ['Early Morning']},
	{firstName: 'Allison', lastName: 'Scharfstein', age: 27, phone: '+12168700516', city: 'New York City', prefNeighborhoods: ['Williamsburg','Upper East Side'], prefDist: 3, prefSpeed: '8-9', prefWeekdayTime: ['Early Morning','Morning'], prefWeekendTime: ['Early Morning','Mid-day']},
	{firstName: 'Jonathan', lastName: 'Scharfstein', age: 50, phone: '+12168700516', city: 'New York City', prefNeighborhoods: ['East Village','Upper East Side'], prefDist: 2.5, prefSpeed: '8-9', prefWeekdayTime: ['Early Morning','Morning'], prefWeekendTime: ['Early Morning','Mid-day']},
	{firstName: 'Suzanne', lastName: 'Scharfstein', age: 50, phone: '+12168700516', city: 'New York City', prefNeighborhoods: ['East Village','Upper East Side'], prefDist: 3.5, prefSpeed: '8-9', prefWeekdayTime: ['Early Morning','Morning'], prefWeekendTime: ['Early Morning','Morning']},
	{firstName: 'Jacquie', lastName: 'Lis', age: 25, phone: '+12168700516', city: 'New York City', prefNeighborhoods: ['East Village','West Side Highway'], prefDist: 8, prefSpeed: '7-8', prefWeekdayTime: ['Early Morning','Morning'], prefWeekendTime: ['Early Morning','Morning']},
	{firstName: 'Meredith', lastName: 'Armstrong', age: 25, phone: '+12168700516', city: 'New York City', prefNeighborhoods: ['East Village','West Side Highway'], prefDist: 9, prefSpeed: '7-8', prefWeekdayTime: ['Early Morning','Morning'], prefWeekendTime: ['Early Morning','Morning']},
	{firstName: 'Viv', lastName: 'Chan', age: 25, phone: '+12168700516', city: 'New York City', prefNeighborhoods: ['East Village','Williamsburg'], prefDist: 4, prefSpeed: '8-9', prefWeekdayTime: ['Early Morning','Morning'], prefWeekendTime: ['Early Morning','Morning']},
]

const users = [
  {email: 'michelle@gmail.com', password: 'michelle', profileId: 1},
	{email: 'julia@gmail.com', password: 'julia', profileId: 2},
	{email: 'allison@gmail.com', password: 'allison', profileId: 3},
	{email: 'jonathan@gmail.com', password: 'jonathan', profileId: 4},
	{email: 'suzanne@gmail.com', password: 'suzanne', profileId: 5},
	{email: 'jacquie@gmail.com', password: 'jacquie', profileId: 6},
	{email: 'meredith@gmail.com', password: 'meredith', profileId: 7},
	{email: 'viv@gmail.com', password: 'viv', profileId: 8}
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
	{dist: 4, speed: '8:30', date: new Date('9/23/2017'), status: "Completed", neighborhood: 'East Village'},

	{dist: 5, speed: '8:45', date: new Date(Date.now()), status: "Completed", neighborhood: 'Williamsburg'},

	{dist: 3, speed: '9:45', date: new Date(Date.now()), status: "Completed", neighborhood: 'East Village'},

	{dist: 8, speed: '8:45', date: new Date(Date.now()), status: "Completed", neighborhood: 'West Side Highway'},

	{dist: 4, speed: '8:45', date: new Date('9/26/2017'), status: "Upcoming", neighborhood: 'West Side Highway'},

	{dist: 4, speed: '8:45', date: new Date('9/27/2017'), status: "Upcoming", neighborhood: 'Williamsburg'},

	{dist: 3, speed: '8:45', date: new Date('9/26/2017'), status: "Upcoming", neighborhood: 'Williamsburg'},

	{dist: 5, speed: '8:20', date: new Date('9/26/2017'), status: "Upcoming", neighborhood: 'Upper East Side'},

	{dist: 6, speed: '7:45', date: new Date('9/27/2017'), status: "Upcoming", neighborhood: 'Soho'},

]

const rundetails = [
	{rating: 4, runId: 1, profileId: 1},
	{rating: 2, runId: 1, profileId: 2},

	{rating: 4, runId: 2, profileId: 3},
	{rating: 2, runId: 2, profileId: 4},

	{rating: 4, runId: 3, profileId: 5},
	{rating: 2, runId: 3, profileId: 1},

	{rating: 5, runId: 4, profileId: 6},
	{rating: 5, runId: 4, profileId: 7},

	{runId: 5, profileId: 8},
	{runId: 5, profileId: 2},

	{runId: 6, profileId: 3},
	{runId: 6, profileId: 4},

	{runId: 7, profileId: 6},
	{runId: 7, profileId: 7},

	{runId: 8, profileId: 2},
	{runId: 8, profileId: 5},

	{runId: 9, profileId: 3},
	{runId: 9, profileId: 1},
]

const seed = () => {
	var allProfiles = profiles.map(profile => {Profile.create(profile)})
	var allUsers = users.map(user => { User.create(user) });
	var allCities = cities.map(city => { City.create(city)})
	var allNewYorkNeigh = newYorkNeighborhoods.map(neighborhood => {Neighborhood.create(neighborhood)})
	var allRuns = runs.map(run => {Run.create(run)})
	var allRunDetails = rundetails.map(details => {RunUserDetails.create(details)})

	 	return Promise.all(allUsers.concat(allCities).concat(allNewYorkNeigh).concat(allRuns).concat(allProfiles).concat(allRunDetails))
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
