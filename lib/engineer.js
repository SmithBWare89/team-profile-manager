const Employee = require('./__mocks__/employee');

class Engineer extends Employee{
    constructor(github, name, email, id) {
        super(name, email, id),
        this.role = this.getRole(),
        this.github = this.getGithub(github)
    }

    getGithub(github) {
        return `http://www.github.com/${github}`;
    }

    getRole(){
        return 'Engineer';
    }
}

module.exports = Engineer;