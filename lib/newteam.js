// Node Packages
const inquirer = require('inquirer');
const validator = require('node-email-validation');
const fs = require('fs');

// Class Constructors
const Engineer = require('./engineer');
const Manager = require('./manager');
const Intern = require('./intern');
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
                this.newManager();
            })
    }

    newMember(){
        inquirer
            .prompt([                
                {
                    type: 'input',
                    name: 'employeeName',
                    message: 'Please enter the team members name:',
                    validate: function (input) {
                        // Declare function as asynchronous, and save the done callback
                        var done = this.async();
                        let regex = /[^a-zA-Z ]/g;
                        // Do async stuff
                        setTimeout(function () {
                            if (!input.trim()) {
                                done('Please enter a name.');
                                return;
                            } else if (regex.test(input)) {
                                done('Name cannot contain digits or special characters.');
                                return;
                            }
                            // Pass the return value in the done callback
                            done(null, true);
                        }, 1000);
                    }
                },
                {
                    type: 'input',
                    name: 'employeeEmail',
                    message: 'Please enter the team members email:',
                    validate: input => validator.is_email_valid(input)
                },
                {
                    type: 'input',
                    name: 'employeeId',
                    message: 'Please enter the team members id number:',
                    validate: function (input) {
                        const number = Number(input);
                        const done = this.async();
                        setTimeout(function () {
                            if (isNaN(number)) {
                                done('This is not a number.')
                                return;
                            } else if (number <= 0) {
                                done('The id must be a positive integer.')
                                return;
                            } else if (/^0*$/.test(input)) {
                                done('This is not a valid office number.')
                                return;
                            }
                            done(null, true);
                        }, 300)
                    }
                },
                {
                    type: 'list',
                    name: 'employeeRole',
                    message: 'Please select this employees job title.',
                    choices: ['Engineer', 'Intern']
                },
                {
                    type: 'input',
                    name: 'school',
                    message: 'Please enter the school this intern attends.',
                    when: ({employeeRole}) => employeeRole === 'Intern',
                    validate: function (input) {
                        // Declare function as asynchronous, and save the done callback
                        var done = this.async();
                        let regex = /[^a-zA-Z ]/g;
                        // Do async stuff
                        setTimeout(function () {
                            if (!input.trim()) {
                                done('Please enter a school name.');
                                return;
                            } else if (regex.test(input)) {
                                done('School name cannot contain digits or special characters.');
                                return;
                            }                            
                            // Pass the return value in the done callback
                            done(null, true);
                        }, 1000);
                    }
                },
                {
                    type: 'input',
                    name: 'gitHub',
                    message: 'Please enter the Engineers GitHub username',
                    when: ({employeeRole}) => employeeRole === 'Engineer',
                    validate: input => {
                        if (input.trim()) {
                            console.log('Please enter a github username')
                            return;
                        }
                    }
                }
            ])
            .then(({ employeeName, employeeEmail, employeeRole, employeeId, school, gitHub}) => {
                if(employeeRole === 'Engineer') {
                    this.teamMembers.push(new Engineer(employeeName, employeeEmail, gitHub, employeeId));
                    this.addAdditional();
                };
                if (employeeRole === 'Intern') { 
                    this.teamMembers.push(new Intern(employeeName, employeeEmail, school, employeeId));
                    this.addAdditional();
                };
            })
    }

    newManager(){
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'managerName',
                    message: 'Please enter the Managers name:',
                    validate: input => !!(input.trim() || console.log('Please enter your name.'))
                },
                {
                    type: 'input',
                    name: 'managerId',
                    message: 'Please enter the Managers id number:',
                    validate: function (input) {
                        const number = Number(input);
                        const done = this.async();
                        setTimeout(function () {
                            if (isNaN(number)) {
                                done('This is not a number.')
                                return;
                            } else if (number <= 0) {
                                done('The id must be a positive integer.')
                                return;
                            } else if (/^0*$/.test(input)) {
                                done('This is not a valid office number.')
                                return;
                            }
                            done(null, true);
                        }, 300)
                    }
                },
                {
                    type: 'input',
                    name: 'managerEmail',
                    message: 'Please enter the Managers email:',
                    validate: input => validator.is_email_valid(input)
                },
                {
                    type: 'input',
                    name: 'managerNumber',
                    message: 'Please enter the managers office number',
                    validate: function(input) {
                        const number = Number(input);
                        const done = this.async();
                        setTimeout(function(){
                            if (isNaN(number)) {
                                done('This is not a number.')
                                return;
                            } else if (number <= 0) {
                                done('This is not a valid office number.')
                                return;
                            } else if (/^0*$/.test(input)) {
                                done('This is not a valid office number.')
                                return;
                            } else if (input.length > 5) {
                                done('This is not a valid office number.')
                                return;
                            }
                            done(null, true);
                        }, 300)
                    }
                }
            ])
            .then(({managerName, managerEmail, managerNumber, managerId}) => {
                this.teamMembers.push(new Manager(managerName, managerEmail, managerNumber, managerId));
                this.newMember();
            })
    }

    addAdditional(){
        inquirer
            .prompt(
                {
                    type: 'list',
                    name: 'userPrompt',
                    message: 'What would you like to do?',
                    choices: ['Add another team member', 'Build your teams page']
                }
            )
            .then(({userPrompt}) => {
                if (userPrompt === 'Add another team member') this.newMember();
                if (userPrompt === 'Build your teams page') this.makeDirectory() //Build the team
            })
    }

    makeDirectory() {
        new Promise((resolve, reject) => {
            fs.mkdir('./dist', { recursive: true }, (err, path) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve({
                    ok: true,
                    message: 'Your file directory has been created!'
                });
            });
        })
        this.writeTeamFile();
    };

    writeTeamFile() {
        new Promise((resolve, reject) => {
            fs.writeFile(`./dist/${this.teamName}.json`, JSON.stringify(this), err => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(
                    console.log('File created! Check your dist folder')
                );
            });
        });
    }

    generateHTML(){
        const HTML = 
    }
} 

module.exports = NewTeam;