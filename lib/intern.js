const Employee = require('../lib/__mocks__/employee');

class Intern extends Employee {
    constructor (school, name, id, email){
        super(name, email, id),
        this.role = this.getRole(),
        this.school = this.checkSchool(school)
    }

    getRole(){
        return 'Intern';
    }

    getSchool(){
        return this.school;
    }

    checkSchool(school){
        let regex = /[^a-zA-Z ]/g;
        if(!regex.test(school)){
            return school;
        } else {
            return console.log('School name cannot contain numbers or special characters.')
        }
    }
}

module.exports = Intern;