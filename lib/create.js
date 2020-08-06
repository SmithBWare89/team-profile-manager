const inquirer = require('inquirer');

function Create() {
    this.teamName = '';
}

Create.prototype.initialize = function(){
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
                console.log('New Team will be created.');
            } else if (choice === 'Update Existing Team') {
                console.log('We will grab an existing teams information to update');
            } else if (choice === 'Show Team Page') {
                console.log('We will grab an existing teams information to display');
            }
        })
}

module.exports = Create;