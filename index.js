const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inq = require('inquirer');
const inquirer = require('./program/inquirer.js');
const queries = require('./program/queries.js')


// -- MAIN PROGRAM --

clear(); // Clearing Terminal

// Displaying Title
console.log(
	chalk.green(
		figlet.textSync('Look Inna Book', { horizontalLayout: 'full' })
	)
);

run(); // Running the Main Program

// -- HELPER FUNCTIONS --

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
	while (loggedIn == false) { // Prompt login until given valid credentials
		let cred = await inquirer.login();
		loggedIn = await queries.checkCredentials(cred['user'], cred['pass']);
	}
	newpage();
}

async function register() {
	console.log('Registration Page');
	let isRegistered = false;
	while (isRegistered = false) {
		let newUser = await inquirer.register();
		isRegistered = await queries.registerUser(newUser);
		if (isRegistered == true) {
			console.log('Registration Unsuccessful - Try Again');
		}
		else {
			console.log('User with this ');
		}
	}
	newpage();
}

async function bookstore_flow() {
	while (true) {
		let answerObj = await inquirer.main();
		if (answerObj['action'] == 'Browse book collection') {

		}
		else if (answerObj['action'] == 'Approximate search for books') {

		}
		else if (answerObj['action'] == 'View Cart') {

		}
		else if (answerObj['action'] == 'Track Orders') {

		}
		else if (answerObj['action'] == 'View Store Reports') {

		}
		else {
			break;
		}
	}
}
