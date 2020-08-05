const Employee = require('../lib/employee');
const Manager = require('../lib/manager');

test('that the managers number is set', () => {
    const manager = new Manager(5558675309);

    expect(manager.officeNumber).toEqual(expect.any(Number));
})

test('that the managers number is 10 digits', () => {
    const manager = new Manager(5558675309);

    expect(manager.officeNumber.toString()).toHaveLength(10);
})