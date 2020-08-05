const Employee = require('./employee');

class Manager extends Employee {
    constructor (officeNumber, name, id, email){
        super(name, id, email),
        this.role = "Manager",
        this.officeNumber = Number(officeNumber)
    };
}


module.exports = Manager;