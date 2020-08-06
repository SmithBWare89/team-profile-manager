const Manager = require('../lib/manager');

test('that the managers number is set', () => {
    const manager = new Manager(5558675309);

    expect(manager.officeNumber).toEqual(expect.any(Number));
});

test('that the managers number is 10 digits', () => {
    const manager = new Manager(5558675309);

    expect(manager.officeNumber.toString()).toHaveLength(10);
});

test('if the employee information extends to Manager', () => {
    const manager = new Manager(5558675309);

    expect(manager.name).toEqual(expect.any(String));
    expect(manager.email).toEqual(expect.any(String));
    expect(manager.role).toEqual(expect.any(String));
    expect(manager.id).toEqual(expect.any(Number));
});

test('if get role returns the updated role', () => {
    const manager = new Manager(5558675309);

    expect(manager.role).toEqual('Manager');
});

test('if the error is console logged when type of number is a string', () => {
    const manager = new Manager('5558675309');

    expect("Office number must be a number!");
})

test('if the error is console logged when input is less than 0', () => {
    const manager = new Manager(-1500);

    expect("Office number must be a positive number!");
})

test('if the error is console logged when length is less than or greater than 10', () => {
    const manager = new Manager(5558609);
    const manager2 = new Manager(123132123132132);

    expect("Office number must be 10 digits");
})