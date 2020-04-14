const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inq = require('inquirer');
const inquirer = require('./program/inquirer.js');
const queries = require('./program/queries.js')

// -- GLOBAL VARIABLES --
let curr_user = {}; // {'client_id': NULL, 'loggedIn': false}


// -- MAIN PROGRAM --

clear(); // Clearing Terminal
displayTitle(); // Displaying Title
run(); // Running the Main Program

// -- HELPER FUNCTIONS --

function displayTitle() {
	console.log(
		chalk.green(
			figlet.textSync('Look Inna Book', { horizontalLayout: 'full' })
		)
	);
}

async function run() {
	let answerObj = await inquirer.launch();
	newPage();

	if (answerObj['action'] == 'Log In') {
		await signIn();
		await bookstore_flow();
	}
	else if (answerObj['action'] == 'Register') {
		await register();
		await signIn();
		await bookstore_flow();
	}
	else if (answerObj['action'] = 'Browse Bookstore') {
		await bookstore_flow();
	}
	else { // Exit Program
		console.log('Goodbye!');
		return;
	}
}

function newPage() {
	console.log(chalk.green(new inq.Separator()));
}

async function signIn() {
	console.log('Sign In Page');
	let loggedIn = false;
	let result = {};
	while (loggedIn == false) { // Prompt login until given valid credentials
		let cred = await inquirer.login();
		result = await queries.checkCredentials(cred['user'], cred['pass']);
		loggedIn = result['loggedIn'];
		if (loggedIn == false) {
			console.log('Invalid Credentials - Try Again.');
		}
		else {
			user = result;
		}
	}
	newPage();
}

async function register() {
	console.log('Registration Page');
	let isRegistered = false;
	while (isRegistered == false) {
		let newUser = await inquirer.register();
		isRegistered = await queries.registerUser(newUser);
		if (isRegistered == false) {
			console.log('Registration Unsuccessful - Try Again');
		}
		else {
			console.log('Registration Successful!');
			newPage();
		}
	}
}

function displayResults(results) {
	if (results.rows.length == 0) {
		console.log('No Results Found.');
	}
	else {
		console.table(results.rows);
	}
}

async function bookstore_flow() {
	while (true) {
		newPage();
		let answerObj = await inquirer.main();
		if (answerObj['action'] == 'Browse entire book collection') {
			let results = await queries.searchAllBooks();
			displayResults(results)
		}
		else if (answerObj['action'] == 'Search for books by genre') {
			let search = await inquirer.searchBookGenre();
			let results = await queries.searchBookGenre(search['genre']);
			displayResults(results)
		}
		else if (answerObj['action'] == 'Search for books by publisher') {
			let search = await inquirer.searchBookPublisher();
			let results = await queries.searchBookPublisher(search['publisher']);
			displayResults(results)
		}
		else if (answerObj['action'] == 'Search for specific book by ISBN') {
			let search = await inquirer.searchBookISBN();
			let results = await queries.searchBookISBN(search['isbn']);
			displayResults(results)
		}
		else if (answerObj['action'] == 'Approximate search for books by title') {
			let search = await inquirer.searchBookTitle();
			let results = await queries.searchBookTitleAprox(search['title']);
			displayResults(results)
		}
		else if (answerObj['action'] == 'View Cart') {
			if (curr_user['client_id']) {
				let results = await queries.viewCart(curr_user['client_id']);
				displayResults(results)
			}
			else {
				console.log('Must be Signed In. ');
			}
		}
		else if (answerObj['action'] == 'Track Orders') {
			if (curr_user['client_id']) {
				let results = await queries.searchOrders(curr_user['client_id']);
				displayResults(results)
			}
			else {
				console.log('Must be Signed In. ');
			}
		}
		else if (answerObj['action'] == 'View Store Reports') {

		}
		else {
			break;
		}
	}
}
