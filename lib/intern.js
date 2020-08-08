const Employee = require('./employee');

class Intern extends Employee {
    constructor (name, email, school){
        super(name, email),
        this.role = this.getRole(),
        this.school = school
    }

    getRole(){
        return 'Intern';
    }

    getSchool(){
        return this.school;
    }
}

module.exports = Intern;