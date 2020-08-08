const Engineer = require('../lib/engineer');
const Employee = require('../lib/__mocks__/employee')

new Employee();

test('if github name is a string', () => {
    const engineer = new Engineer('Dave','Email@gmail.com','Github99', 231321);
    expect(engineer.github).toEqual(expect.any(String));
})

test('if getGithub converts the file to a GitHub link', () => {
    const engineer = new Engineer('Dave','Email@gmail.com','Github99', 231321);

    expect(engineer.getGithub()).toEqual('http://www.github.com/Github99');
})

test('if the role is a string and equal to engineer', () => {
    const engineer = new Engineer('Dave','Email@gmail.com','Github99', 231321);

    expect(engineer.role).toEqual(expect.any(String));
    expect(engineer.getRole()).toEqual('Engineer');
})

test('if the employee information extends to Manager', () => {
    const engineer = new Engineer('Dave','Email@gmail.com','Github99', 231321);

    expect(engineer.name).toEqual(expect.any(String));
    expect(engineer.email).toEqual(expect.any(String));
    expect(engineer.role).toEqual(expect.any(String));
    expect(engineer.id).toEqual(expect.any(Number));
})