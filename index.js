// Node Packages
const inquirer = require('inquirer');
const validator = require('node-email-validation');
const fs = require('fs');
const cp = require('child_process');

// Class Constructors
const Engineer = require('./engineer');
const Manager = require('./manager');
const Intern = require('./intern');

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
                        let regex = /[^a-zA-Z ]/g;
                        if (!input.trim()) {
                            return 'Please enter a name.';
                        } 
                        if (regex.test(input)) {
                            return 'Name cannot contain digits or special characters.';
                        }
                        return true;
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
                        let regex = /[^a-zA-Z ]/g;
                        if (!input.trim()) {
                            return 'Please enter a name.';
                        } 
                        if (regex.test(input)) {
                            return 'Name cannot contain digits or special characters.';
                        }
                        return true;
                    }
                },
                {
                    type: 'input',
                    name: 'gitHub',
                    message: 'Please enter the Engineers GitHub username',
                    when: ({employeeRole}) => employeeRole === 'Engineer'
                },
                {
                    type: 'list',
                    name: 'userPrompt',
                    message: 'What would you like to do?',
                    choices: ['Add another team member', 'Build your teams page']
                }
            ])
            .then(({ employeeName, employeeEmail, employeeRole, employeeId, school, gitHub, userPrompt}) => {
                if(employeeRole === 'Engineer') {
                    this.teamMembers.push(new Engineer(employeeName, employeeEmail, gitHub, employeeId));
                };
                if (employeeRole === 'Intern') { 
                    this.teamMembers.push(new Intern(employeeName, employeeEmail, school, employeeId));
                };
                if(userPrompt === 'Add another team member'){
                    this.newMember();
                } else if (userPrompt === 'Build your teams page') {
                    this.makeDirectory(); //Build the team
                }
            })
    }

    newManager(){
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'managerName',
                    message: 'Please enter the Managers name:',
                    validate: function (input) {
                        // Declare function as asynchronous, and save the done callback
                        let regex = /[^a-zA-Z ]/g;
                        if (!input.trim()) {
                            return 'Please enter a name.';
                        } 
                        if (regex.test(input)) {
                            return 'Name cannot contain digits or special characters.';
                        }
                        return true;
                    }
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

    makeDirectory() {
        // Creates Dist folder
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

        // Creates the webpage
        this.createPage();
    };

    writePageFile(info){
        new Promise((resolve, reject) => {
            fs.writeFile(`./dist/index.html`, info, err => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(this.openPage())
            });
        });
    }

    createPage(){
        const HTML = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="./assets/style.css">
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.13.0/css/all.css" integrity="sha384-Bfad6CLCknfcloXFOyFnlgtENryhrpZCe29RTifKEixXQZ38WheV+i/6YWSzkz3V" crossorigin="anonymous">
                <title>${this.teamName} Team</title>
            </head>
            <body>
                <header>
                    <h1>${this.teamName} Team</h1>
                </header>
                <main>
                ${this.teamMembers
                    .filter(index => index instanceof Manager)
                    .map(({name, email, role, id, officeNumber}) => {
                        return `
                        <div class="card">
                            <div class="card-header">
                                <h1 class="name">${name}</h1>
                                <h3 class="role"><span><i class="fas fa-mug-hot"></i> ${role}</h3>
                            </div>
                            <div class="card-container">
                                <li class="item">ID: ${id}</li>
                                <li class="item">Email: <a href=mailto:${email}>${email}</a></li>
                                <li class="item">Office Number: ${officeNumber}</li>
                            </div>
                        </div>`
                })}
                ${this.teamMembers
                    .filter(index => index instanceof Engineer)
                    .map(({name, email, role, id, github}) => {
                        return `<div class="card">
                        <div class="card-header">
                            <h1 class="name">${name}</h1>
                            <h3 class="role"><i class="fas fa-glasses"></i> ${role}</h3>
                        </div>
                        <div class="card-container">
                            <li class="item">ID: ${id}</li>
                            <li class="item">Email: <a href=mailto:${email}>${email}</a></li>
                            <li class="item">GitHub: <a href="http://www.github.com/${github}" target="_blank">${github}</a></li>
                        </div>
                    </div>`
                })}
                ${this.teamMembers
                    .filter(index => index instanceof Intern)
                    .map(({name, email, role, id, school}) => {
                        return `<div class="card">
                        <div class="card-header">
                            <h1 class="name">${name}</h1>
                            <h3 class="role"><i class="fas fa-user-graduate"></i> ${role}</h3>
                        </div>
                        <div class="card-container">
                            <li class="item">ID: ${id}</li>
                            <li class="item">Email: <a href=mailto:${email}>${email}</a></li>
                            <li class="item">School: ${school}</li>
                        </div>
                    </div>`
                })}
                </main>
            </body>
            </html>
        `;
    this.writePageFile(HTML);
    }

    openPage(){
        inquirer
            .prompt([
                {
                    type: 'confirm',
                    name: 'openConfirm',
                    message: 'Would you like to open the generated HTML file?',
                    default: false
                }
            ])
            .then(confirm => {
                if (!confirm.openConfirm) {
                    return console.log('Open your file in the dist folder.');
                }
                else {
                    cp.exec('"dist/index.html"', (err, stdout, stderr) => {
                        if (err) throw err;
                        console.log('Success! Your file will open!');
                    });
                };
            })
    }
} 

module.exports = NewTeam;