const Manager = require('../lib/manager');

test('that the managers number is set', () => {
    const manager = new Manager(5558675309);

    expect(manager.officeNumber).toEqual(expect.any(Number));
})

test('that the managers number is 10 digits', () => {
    const manager = new Manager(5558675309);

    expect(manager.officeNumber.toString()).toHaveLength(10);
})

test('if the employee information extends to Manager', () => {
    const manager = new Manager(5558675309);

    expect(manager.name).toEqual(expect.any(String));
    expect(manager.email).toEqual(expect.any(String));
    expect(manager.role).toEqual(expect.any(String));
    expect(manager.id).toEqual(expect.any(Number));
})

test('if get role returns the updated role', () => {
    const manager = new Manager(5558675309);

    expect(manager.role).toEqual('Manager');
})