const Employee = require('./employee');
const inquirer = require('inquirer')

class Manager extends Employee {
    constructor (name, email, number){
        super(name, email)
        this.role = this.getRole(),
        this.officeNumber = Number(number);
    }

    getRole(){
        return 'Manager';
    }
}


module.exports = Manager;