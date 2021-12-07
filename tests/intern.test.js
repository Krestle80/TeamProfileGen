const int = require("../lib/Intern")


test('is the class working?', () =>{
    const newIntern = new int('chris', '80', 'email@email.com', 'MSU')
    expect(typeof newIntern).toBe('object')
})

test('get intern School check', ()=>{
    const newIntern = new int('chris', '80', 'email@email.com', 'MSU')
    const expected = 'MSU'
    expect(newIntern.getSchool()).toBe(expected)
})

test('role check', ()=> {
    const newIntern = new int('chris', '80', 'email@email.com', 'MSU')
    const expected = "Intern"
    expect(newIntern.getRole()).toBe(expected)
})