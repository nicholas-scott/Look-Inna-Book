// Connecting to Postgres
const {Client} = require('pg');
const client = new Client({
    user: 'postgres',
    password: 'postgres',
    host: 'MKR03',
    database: 'postgres', 
    port: 5432,
});

module.exports = {
	checkCredentials: async (username, pass) => {
    await client.connect();
    // Query finds user with given username and password
    let res = await client.query(
      `select username, password
      from client
      where username = ${username} and password = ${pass}`
    );
    await client.end();

    // Return True iff unique user with given user/pass exists.
    return (res.rows.length == 1) ? true : false;
	},

  registerUser: async (newUser) => {
    await client.connect();
    // Query adds new user information to database
  }
};


// client.query(query)
//       .then (res => {})
//       .catch (err => {})
//       .finally (() => { client.end(); });
// client.connect(); // Connecting to Database
