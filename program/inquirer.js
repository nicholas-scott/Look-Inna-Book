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
        choices: ['Log In', 'Register', new inquirer.Separator(), 'Exit Program']
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
            return message;
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
            return message;
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
            return message;
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
            return message;
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
            return message;
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
            return message;
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
            return message;
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
            return message;
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
            return message;
          }
        }
      },
      {
        name: 'bill_postal',
        type: 'input',
        message: 'Billing Information - Postal Code: ',
        validate: function (value) {
          if (value.length == 4) {
            return true;
          }
          else {
            return message;
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
            return message;
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
            return message;
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
            return message;
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
            return message;
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
            return message;
          }
        }
      },
      {
        name: 'ship_postal',
        type: 'input',
        message: 'Shipping Information - Postal Code: ',
        validate: function (value) {
          if (value.length == 4) {
            return true;
          }
          else {
            return message;
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
            return message;
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
            return message;
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
            return message;
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
          'Browse book collection',
          'Approximate search for books',
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

}
