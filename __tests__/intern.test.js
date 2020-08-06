const Intern = require('../lib/intern');

test('if the employee information extends to Intern', () => {
    const intern = new Intern('University of Central Florida');

    expect(intern.name).toEqual(expect.any(String));
    expect(intern.email).toEqual(expect.any(String));
    expect(intern.role).toEqual(expect.any(String));
    expect(intern.id).toEqual(expect.any(Number));
})

test('if the role returned is Intern', () => {
    const intern = new Intern('University of Central Florida');

    expect(intern.role).toEqual('Intern');
})

test('if school returns a string', () => {
    const intern = new Intern('University of Central Florida');

    expect(intern.school).toEqual(expect.any(String));
})

test('if schools value is user Inputted', () => {
    const intern = new Intern('University of Central Florida');

    expect(intern.school).toEqual('University of Central Florida')
})

test('if getSchool function returns a string', () => {
    const intern = new Intern('University of Central Florida');

    expect(intern.getSchool()).toEqual(expect.any(String))
})

test('if getSchool returns the user inputted string', () => {
    const intern = new Intern('University of Central Florida');

    expect(intern.getSchool()).toEqual('University of Central Florida');
})

test('if input only allows letters', () => {
    const intern = new Intern('Alcorn Agricultural & Mechanical College');
    const intern2 = new Intern('1231');

    expect('School name cannot contain numbers or special characters.');
})