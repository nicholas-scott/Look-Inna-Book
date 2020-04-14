const inquirer = require('inquirer');

module.exports = {
  createquestion: (name, type, message) => {
    const question = {
      name:name,
      type:type,
      message: message,
      validate: function (value) {
        if (value.length) {
          return true;
        }
        else {
          return message;
        }
      }
    }
    return question;
  },

  launch: () => {
    const questions = [
      {
        name: 'action',
        type: 'list',
        message: 'Welcome! What do you want to do?',
        choices: ['Log In', 'Register', 'Browse Bookstore', new inquirer.Separator(), 'Exit Program']
      }
    ];
    return inquirer.prompt(questions);
  },

  register: () => {
    const questions = [
      {
        name:'email',
        type:'input',
        message: 'E-mail: ',
        validate: function (value) {
          if (value.length <= 50) {
            return true;
          }
          else {
            return 'E-mail: ';
          }
        }
      },
      {
        name:'username',
        type:'input',
        message: 'Username: ',
        validate: function (value) {
          if (value.length <= 30) {
            return true;
          }
          else {
            return 'Username: ';
          }
        }
      },
      {
        name: 'password',
        type: 'password',
        message: 'Password: ',
        mask: '*',
        validate: function (value) {
          if (value.length <= 30) {
            return true;
          }
          else {
            return 'Password: ';
          }
        }
      },
      {
        name: 'card_num',
        type: 'input',
        message: 'Billing Information - Card Number: ',
        validate: function (value) {
          if (value.length == 16 && !isNaN(value)) {
            return true;
          }
          else {
            return 'Billing Information - Card Number: ';
          }
        }
      },
      {
        name: 'cvv',
        type: 'input',
        message: 'Billing Information - CVV: ',
        validate: function (value) {
          if (value.length == 3 && !isNaN(value)) {
            return true;
          }
          else {
            return 'Billing Information - CVV: ';
          }
        }
      },
      {
        name:'bill_first',
        type:'input',
        message: 'Billing Information - First Name: ',
        validate: function (value) {
          if (value.length <= 20) {
            return true;
          }
          else {
            return 'Billing Information - First Name: ';
          }
        }
      },
      {
        name:'bill_last',
        type:'input',
        message: 'Billing Information - Last Name: ',
        validate: function (value) {
          if (value.length <= 20) {
            return true;
          }
          else {
            return 'Billing Information - Last Name: ';
          }
        }
      },
      {
        name:'bill_street',
        type:'input',
        message: 'Billing Information - Street: ',
        validate: function (value) {
          if (value.length <= 40) {
            return true;
          }
          else {
            return 'Billing Information - Street: ';
          }
        }
      },
      {
        name: 'bill_suite',
        type: 'input',
        message: 'Billing Information - Suite Number: ',
        validate: function (value) {
          if (value.length <= 4 && !isNaN(value)) {
            return true;
          }
          else {
            return 'Billing Information - Suite Number: ';
          }
        }
      },
      {
        name: 'bill_postal',
        type: 'input',
        message: 'Billing Information - Postal Code: ',
        validate: function (value) {
          if (value.length == 6) {
            return true;
          }
          else {
            return 'Billing Information - Postal Code: ';
          }
        }
      },
      {
        name: 'bill_city',
        type: 'input',
        message: 'Billing Information - City: ',
        validate: function (value) {
          if (value.length <= 40) {
            return true;
          }
          else {
            return 'Billing Information - City: ';
          }
        }
      },
      {
        name: 'bill_province',
        type: 'input',
        message: 'Billing Information - Province: ',
        validate: function (value) {
          if (value.length <= 40) {
            return true;
          }
          else {
            return 'Billing Information - Province: ';
          }
        }
      },
      {
        name: 'bill_country',
        type: 'input',
        message: 'Billing Information - Country: ',
        validate: function (value) {
          if (value.length <= 40) {
            return true;
          }
          else {
            return 'Billing Information - Country: ';
          }
        }
      },
      {
        name:'ship_street',
        type:'input',
        message: 'Shipping Information - Street: ',
        validate: function (value) {
          if (value.length <= 40) {
            return true;
          }
          else {
            return 'Shipping Information - Street: ';
          }
        }
      },
      {
        name: 'ship_suite',
        type: 'input',
        message: 'Shipping Information - Suite Number: ',
        validate: function (value) {
          if (value.length <= 4 && !isNaN(value)) {
            return true;
          }
          else {
            return 'Shipping Information - Suite Number: ';
          }
        }
      },
      {
        name: 'ship_postal',
        type: 'input',
        message: 'Shipping Information - Postal Code: ',
        validate: function (value) {
          if (value.length == 6) {
            return true;
          }
          else {
            return 'Shipping Information - Postal Code: ';
          }
        }
      },
      {
        name: 'ship_city',
        type: 'input',
        message: 'Shipping Information - City: ',
        validate: function (value) {
          if (value.length <= 40) {
            return true;
          }
          else {
            return 'Shipping Information - City: ';
          }
        }
      },
      {
        name: 'ship_province',
        type: 'input',
        message: 'Shipping Information - Province: ',
        validate: function (value) {
          if (value.length <= 40) {
            return true;
          }
          else {
            return 'Shipping Information - Province: ';
          }
        }
      },
      {
        name: 'ship_country',
        type: 'input',
        message: 'Shipping Information - Country: ',
        validate: function (value) {
          if (value.length <= 40) {
            return true;
          }
          else {
            return 'Shipping Information - Country: ';
          }
        }
      },
      {
        name: 'isOwner',
        type: 'confirm',
        message: 'Are you the Owner of Look Inna Book? '
      }
    ];
    return inquirer.prompt(questions);
  },

  login: () => {
    const questions = [
      module.exports.createquestion('user', 'input', 'Username: '),
      {
        name: 'pass',
        type: 'password',
        message: 'Password: ',
        mask: '*'
      }
    ];
    return inquirer.prompt(questions);
  },

  main: () => {
    const questions = [
      {
        name: 'action',
        type: 'list',
        message: 'What do you want to do?',
        choices: [
          'Browse entire book collection',
          'Search for books by genre',
          'Search for books by publisher',
          'Search for specific book by ISBN',
          'Approximate search for books by title',
          'View Cart',
          'Track Orders',
          'View Store Reports',
          new inquirer.Separator(),
          'Exit Program'
        ]
      }
    ]; 
    return inquirer.prompt(questions);
  },

  searchBookISBN: () => {
    const questions = [
      module.exports.createquestion('isbn', 'input', 'ISBN: ')
    ];
    return inquirer.prompt(questions);
  },

  searchBookGenre: () => {
    const questions = [
      module.exports.createquestion('genre', 'input', 'Genre: ')
    ];
    return inquirer.prompt(questions);
  },

  searchBookTitle: () => {
    const questions = [
      module.exports.createquestion('title', 'input', 'Title: ')
    ];
    return inquirer.prompt(questions);
  },

  searchBookPublisher: () => {
    const questions = [
      module.exports.createquestion('publisher', 'input', 'Publisher: ')
    ];
    return inquirer.prompt(questions);
  }
}
