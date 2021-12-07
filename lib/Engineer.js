const Ee = require("./Ee");

class Engineer extends Ee {
    constructor( name, id , email, gitHub){
        super(name, id, email, "Engineer")
        this.gitHub = gitHub
    }
    getGit(){
        return this.gitHub
    }
}

module.exports = Engineer;