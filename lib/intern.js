const Employee = require('./employee');

class Intern extends Employee {
    constructor (name, email, school, id){
        super(name, email, id),
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