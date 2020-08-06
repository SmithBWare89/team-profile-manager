const Employee = require('../lib/employee');

test('creates an employee object', () => {
    const employee = new Employee('Dave', 'dave@davemail.com');

    expect(employee.name).toEqual(expect.any(String));
    expect(employee.email).toEqual(expect.any(String));
    expect(employee.role).toEqual(expect.any(String));
    expect(employee.id).toEqual(expect.any(Number));
})

test('gets employees information as an object', () => {
    const employee = new Employee('Dave', 'dave@davemail.com');

    expect(employee.getInfo()).toHaveProperty('name');
    expect(employee.getInfo()).toHaveProperty('email');
    expect(employee.getInfo()).toHaveProperty('role');
    expect(employee.getInfo()).toHaveProperty('id');
})

test('gets employees id', () => {
    const employee = new Employee('Dave', 'dave@davemail.com');

    expect(employee.getId()).toEqual(expect.any(Number));
})

test('gets employees role', () => {
    const employee = new Employee('Dave', 'dave@davemail.com');

    expect(employee.getRole()).toEqual(expect.any(String));
})

test('gets employees email', () => {
    const employee = new Employee('Dave', 'dave@davemail.com');
    
    expect(employee.getEmail()).toEqual(expect.any(String));
})
