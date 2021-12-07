
const Ee = require("./Ee");

class Manager extends Ee {
    constructor( name, id , email, officeNumber){
        super(name, id, email, "Manager")
        this.officNumber = officeNumber
    }
    getOfficeNumber(){
        return this.officNumber
    }
}


module.exports = Manager;