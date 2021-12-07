const Ee = require("./Ee");

class Intern extends Ee {
    constructor( name, id , email, school){
        super(name, id, email, "Intern")
        this.school = school
    }
    getSchool(){
        return this.school
    }
}

module.exports = Intern;