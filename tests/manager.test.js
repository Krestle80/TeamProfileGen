const manager = require("../lib/Manager")


test('is the class working?', () =>{
    const newManager = new manager('chris', '80', 'email@email.com', '4')
    expect(typeof newManager).toBe('object')
})

test('get Manager Office Number check', ()=>{
    const newManager = new manager('chris', '80', 'email@email.com', '4')
    const expected = '4'
    expect(newManager.getOfficeNumber()).toBe(expected)
})

test('role check', ()=> {
    const newManager = new manager('chris', '80', 'email@email.com', '4')
    const expected = "Manager"
    expect(newManager.getRole()).toBe(expected)
})