const Intern = require('../lib/intern');
const Employee = require('../lib/__mocks__/employee')

new Employee();
const intern = new Intern('Dave','Email@gmail.com','University of Central Florida', 231321);


test('if the employee information extends to Intern', () => {
    expect(intern.name).toEqual(expect.any(String));
    expect(intern.email).toEqual(expect.any(String));
    expect(intern.role).toEqual(expect.any(String));
    expect(intern.id).toEqual(expect.any(Number));
})

test('if the role returned is Intern', () => {
    expect(intern.getRole()).toEqual('Intern');
})

test('if school returns a string', () => {
    expect(intern.school).toEqual(expect.any(String));
})

test('if schools value is user Inputted', () => {
    expect(intern.school).toEqual('University of Central Florida')
})

test('if getSchool function returns a string', () => {
    expect(intern.getSchool()).toEqual(expect.any(String))
})

test('if getSchool returns the user inputted string', () => {
    expect(intern.getSchool()).toEqual('University of Central Florida');
})

test('if input only allows letters', () => {
    const intern = new Intern('Dave','Email@gmail.com','Alcorn Agricultural & Mechanical College', 231321);
    const intern2 = new Intern('1231');

    expect('School name cannot contain numbers or special characters.');
})