const Engineer = require('../lib/engineer');

test('if github name is a string', () => {
    const engineer = new Engineer('SmithBWare89');
    expect(engineer.github).toEqual(expect.any(String));
})

test('if getGithub converts the file to a GitHub link', () => {
    const engineer = new Engineer('SmithBWare89');

    expect(engineer.github).toStrictEqual('http://www.github.com/SmithBWare89');
})

test('if the role is a string and equal to engineer', () => {
    const engineer = new Engineer('SmithBWare89');

    expect(engineer.role).toEqual(expect.any(String));
    expect(engineer.role).toEqual('Engineer');
})

test('if the employee information extends to Manager', () => {
    const engineer = new Engineer('SmithBWare89');

    expect(engineer.name).toEqual(expect.any(String));
    expect(engineer.email).toEqual(expect.any(String));
    expect(engineer.role).toEqual(expect.any(String));
    expect(engineer.id).toEqual(expect.any(Number));
})