const eng = require("../lib/Engineer")


test('is the class working?', () =>{
    const newEngineer = new eng('chris', '80', 'email@email.com', 'krestle80')
    expect(typeof newEngineer).toBe('object')
})

test('get eng github username', ()=>{
    const newEngineer = new eng('chris', '80', 'email@email.com', 'krestle80')
    const expected = 'krestle80'
    expect(newEngineer.getGit()).toBe(expected)
})

test('role check', ()=> {
    const newEngineer = new eng('chris', '80', 'email@email.com', 'krestle80')
    const expected = "Engineer"
    expect(newEngineer.getRole()).toBe(expected)
})