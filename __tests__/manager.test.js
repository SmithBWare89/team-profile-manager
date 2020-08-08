const Manager = require('../lib/manager');
const Employee = require('../lib/__mocks__/employee')

new Employee();
const manager = new Manager('Dave','Email@gmail.com', 12345, 231321);

test('that the managers number is set', () => {
    expect(manager.officeNumber).toEqual(expect.any(Number));
});

test('if the employee information extends to Manager', () => {
    expect(manager.name).toEqual(expect.any(String));
    expect(manager.email).toEqual(expect.any(String));
    expect(manager.role).toEqual(expect.any(String));
    expect(manager.id).toEqual(expect.any(Number));
});

test('if get role returns the updated role', () => {
    expect(manager.getRole()).toEqual('Manager');
});

test('if the error is console logged when type of number is a string', () => {
    const manager = new Manager('Dave','Email@gmail.com', '12345', 231321);

    expect("Office number must be a number!");
})

test('if the error is console logged when office number is less than 0', () => {
    const intern = new Manager('Dave','Email@gmail.com', -12345, 231321);

    expect("Office number must be a positive number!");
})

test('if the error is console logged when length is greater than 5', () => {
    const manager = new Manager(5558609);
    const manager2 = new Manager(123132123132132);

    expect("Office number must be 10 digits");
})