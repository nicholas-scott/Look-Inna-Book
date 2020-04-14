// Connecting to Postgress
const {Client} = require('pg');
const conString = "postgres://postgres:fishface76@localhost:5432/book_store";
var client = new Client(conString);
client.connect();

module.exports = {
	searchAllBooks: async () => {
    let res = await client.query(
      `select title, price, num_pages, year, quantity, publisher_name
       from book`
    );
		return res;
  },

  searchBookISBN: async (isbn) => {
    let res = await client.query(
      `select title, price, num_pages, year, quantity, publisher_name
       from book
			 where isbn = '${isbn}'`
    );
		return res;
  },

  searchBookPublisher: async (publisher) => {
    let res = await client.query(
      `select title, price, num_pages, year, quantity, publisher_name
       from book
			 where publisher_name = '${publisher}'`
    );
		return res;
  },

  searchBookGenre: async (genre) => {
    let res = await client.query(
      `select title, price, num_pages, year, quantity, publisher_name
      from book natural join book_genre
      where genre_name = '${genre}'`
    );
		return res;
  },

  searchBookTitleAprox: async (title) => {
    let res = await client.query(
      `select title, price, num_pages, year, quantity, publisher_name
	     from book
	     where title ~* '${title}';`
    );
    return res;
  },

  searchOrders: async (id) => {
    let res = await client.query(
      `select order_num, hasArrived
       from purchase
       where id = '${id}'`
    );
    return res;
  },

	viewCart: async (id) => {
		let res = await client.query(
			`select ISBN, quantity
			 from shopping_cart
			 where id = '${id}'`
		);
		return res;
	},

	checkCredentials: async (username, pass) => {
    // Query finds user with given username and password 
    let res = await client.query(
      `select username, password
      from client
      where username = '${username}' and password = '${pass}'`
    );

    // Return True iff unique user with given user/pass exists.
    let result = {'client_id': NULL, 'loggedIn': false}
    if (res.rows.length == 1) {
      result['ID'] = res.rows[0]['id'];
      result['loggedIn'] = true;
      return result;
    }
    return result;
	},

  registerUser: async (newUser) => {
		let isRegistered = false;
		// Query ensures that the new username is unique
		let uniqueUser = await client.query(
			`select username
			from client
			where username = '${newUser['username']}'`
		);

		if (uniqueUser.rows.length > 0) {
			// Then, username isn't unique, don't continue registration
			return isRegistered;
		}
		else {
			// Check if shipping info. already exists
			let uniqueShipping = await client.query(
				`select id
				from address
				where street = '${newUser['ship_street']}' and
							suite_num = '${newUser['ship_suite']}' and
							postal_code = '${newUser['ship_postal']}' and
							province = '${newUser['ship_province']}' and
							city = '${newUser['ship_city']}' and
							country = '${newUser['ship_country']}'`
			);

			let shipping_id = null;
			if (uniqueShipping.rows.length == 0) { // Then, need to insert new address
				shipping_id = await client.query(
					`insert into address(street, suite_num, postal_code, province, city, country)
					 values(${newUser['ship_street']},	${newUser['ship_suite']},
							 	  ${newUser['ship_postal']}, ${newUser['ship_province']},
								  ${newUser['ship_city']}, ${newUser['ship_country']})
					 returning id as shipping_id`
				);
			}
			else {
				shipping_id = uniqueShipping.rows[0]['id'];
			}


			// Check if billing address already exists
			let uniqueBillingAddr = await client.query(
				`select id
				from address
				where street = '${newUser['bill_street']}' and
							suite_num = '${newUser['bill_suite']}' and
							postal_code = '${newUser['bill_postal']}' and
							province = '${newUser['bill_province']}' and
							city = '${newUser['bill_city']}' and
							country = '${newUser['bill_country']}'`
			);

			let billing_addr = null;
			if (uniqueBillingAddr.rows.length == 0 ) { // Then, inserting new address
				billing_addr = await client.query(
					`insert into address(street, suite_num, postal_code, province, city, country)
					 values(${newUser['bill_street']},	${newUser['bill_suite']},
							 	  ${newUser['bill_postal']}, ${newUser['bill_province']},
								  ${newUser['bill_city']}, ${newUser['bill_country']})
					 returning id as billing_addr`
				);
			}
			else {
				billing_addr = uniqueBillingAddr.rows[0]['id'];
			}

			// Check if billing information already exists
			let uniqueBilling = await client.query(
				`select id
				 from billing_information
				 where card_number = ${newUser['card_num']}`
			);

			let billing_id = null;
			if (uniqueBilling.rows.length == 0) {
				// Then, inserting new billing information
				billing_id = await client.query(
					`insert into billing_information(card_number, cvv, first_name, last_name, address_id)
					 values(${newUser['card_num']}, ${newUser['cvv']},
				 					${newUser['bill_first']}, ${newUser['bill_last']},
								  ${billing_addr})`

				);
			}
			else {
				billing_id = uniqueBilling.rows[0]['id'];
			}

			// Creating New Client
			await client.query(
				`insert into client(username, password, email, billing_id, shipping_id, isOwner)
				 values(${newUser['username']}, ${newUser['password']},
				 				${newUser['email']}, ${billing_id}, ${shipping_id},
							  ${newUser['isOwner']})`
			);
		}
  }
};
