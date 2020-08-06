const Employee = require('./employee');

class Manager extends Employee {
    constructor (officeNumber, name, id, email){
        super(name, email, id),
        this.role = this.getRole(),
        this.officeNumber = this.checkNumber(officeNumber)
    }

    getRole(){
        return 'Manager';
    }

    checkNumber(value){
        if (typeof value !== 'number') {
            return console.log("Office number must be a number!");
            } else if(value <= 0) {
                return console.log('Office number must be a positive number!');
            } else if(value.toString().length < 10 || value.toString().length > 10) {
                return console.log("Office number must be 10 digits");
            }
        return value;
    }
}


module.exports = Manager;