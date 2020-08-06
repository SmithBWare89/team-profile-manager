const inquirer = require('inquirer');
const Manager = require('./manager');
const Create = require('./create');

class NewTeam {
    constructor(){
        this.teamName = '';
        this.teamMembers = [];
    }

    newTeam(){
        inquirer
            .prompt(
                {
                    type: 'input',
                    name: 'teamName',
                    message: 'Please enter a team name:',
                    validate: input => !!(input.trim() || console.log('Please enter a valid team name.'))
                }
            )
            .then(({teamName}) => {
                this.teamName = teamName;
                this.newMember();
            })
    }

    newMember(){
        inquirer
            .prompt([                
                {
                    type: 'input',
                    name: 'employeeName',
                    message: 'Please enter the employees name:',
                    validate: input => !!(input.trim() || console.log('Please enter your name.'))
                },
                {
                    type: 'input',
                    name: 'employeeEmail',
                    message: 'Please enter the employees email:',
                    validate: input => !!(input.trim() || console.log('Please enter an email address.'))
                },    
                {
                    type: 'list',
                    name: 'employeeRole',
                    message: 'Please select this employees job title.',
                    choices: ['Manager', 'Engineer', 'Intern']
                }
            ])
            .then(({employeeName, employeeEmail, employeeRole}) => {
                if(employeeRole === 'Manager') {this.newManager(employeeName, employeeEmail)};
                if(employeeRole === 'Enginerr') {this.newEngineer(employeeName, employeeEmail)};
                if(employeeRole === 'Intern') {this.newIntern(employeeName, employeeEmail)};
            })
    }

    newManager(name, email){
        inquirer
            .prompt(
                {
                    type: 'input',
                    name: 'managerNumber',
                    message: 'Please enter the managers phone number',
                    validate: function(input) {
                        const number = Number(input);
                        const done = this.async();
                        setTimeout(function(){
                            if (isNaN(number)) {
                                done('This is not a number.')
                                return;
                            } else if (input.length < 10 || input.length > 10) {
                                done('You must enter 10 digits.')
                                return;
                            }
                            done(null, true);
                        }, 300)
                    }
                }
            )
            .then(({managerNumber}) => {
                this.teamMembers.push(new Manager(name, email, managerNumber.toString()));
                return console.log(this);
            })
    }
}

module.exports = NewTeam;