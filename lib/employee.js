class Employee {
    constructor(name, role, email) {
        this.name = name;
        this.email = email;
        this.role = role;
        this.id = Math.floor(Math.random() * 1001);
    }

    getInfo(){
        return {
            name: this.name,
            id: this.id,
            role: this.role,
            email: this.email
        };
    }

    getId(){
        return this.id
    };

    getRole(){
        return this.role
    };

    getEmail(){
        return this.email
    };
}

module.exports = Employee;