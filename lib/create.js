const inquirer = require('inquirer');
const NewTeam = require('./newteam');

class Create {
    initialize(){
        inquirer
            .prompt(
                {
                    type: 'list',
                    name: 'choice',
                    message: 'What would you like to do?',
                    choices: ['Create New Team', 'Update Existing Team', 'Show Team Page']
                }
            )
            .then(({choice}) => {
                if (choice === 'Create New Team'){
                    return new NewTeam().newTeam();
                } else if (choice === 'Update Existing Team') {
                    console.log('We will grab an existing teams information to update');
                } else if (choice === 'Show Team Page') {
                    console.log('We will grab an existing teams information to display');
                }
            })
    }
}

module.exports = Create;