const Employee = require('./employee');

class Manager extends Employee {
    constructor (name, email, number, id){
        super(name, email, id)
        this.role = this.getRole(),
        this.officeNumber = Number(number);
    }

    getRole(){
        return 'Manager';
    }
}


module.exports = Manager;