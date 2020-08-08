const Employee = require('./employee');

class Engineer extends Employee{
    constructor(name, email, github, id) {
        super(name, email, id),
        this.role = this.getRole(),
        this.github = github
    }

    getGithub() {
        return `http://www.github.com/${this.github}`;
    }

    getRole(){
        return 'Engineer';
    }
}

module.exports = Engineer;