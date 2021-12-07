const { test, expect } = require("@jest/globals")
const ee = require("../lib/Ee")


test('is the class working?', () =>{
    const newEe = new ee('chris', '80', 'email@email.com', 'Employee')
    expect(typeof newEe).toBe('object')
})

test('can you get employee Name', ()=>{
    const newEe = new ee('chris', '80', 'email@email.com', 'Employee')
    const expected = 'chris'
    expect(newEe.getName()).toBe(expected)
})

test('id check', ()=> {
    const newEe = new ee('chris', '80', 'email@email.com', 'Employee')
    const expected = "80"
    expect(newEe.getId()).toBe(expected)
})
test('email Check', () =>{
    const newEe = new ee('chris', '80', 'email@email.com', 'Employee')
    const expected = 'email@email.com'
    expect(newEe.getEmail()).toBe(expected)
})

test('role check', () => {
    const newEe = new ee('chris', '80', 'email@email.com', 'Employee')
    const expected = 'Employee'
    expect(newEe.getRole()).toBe(expected) 
})