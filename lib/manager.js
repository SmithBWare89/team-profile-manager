// const Employee = require('./employee');

const Employee = require('../lib/__mocks__/employee');

class Manager extends Employee {
    constructor (officeNumber, name, id, email){
        super(name, email, id),
        this.role = this.getRole(),
        this.officeNumber = Number(officeNumber);
    }

    getRole(){
        return 'Manager';
    }
}


module.exports = Manager;