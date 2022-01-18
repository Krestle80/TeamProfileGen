const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const Intern = require('./lib/Intern')
const Engineer = require('./lib/Engineer')
const Manager = require('./lib/Manager')
const Ee = require('./lib/Ee')

// function to write slash update the html file
const writeFileAsync = util.promisify(fs.writeFile);
//inquirer questions, mostly to reduce the size of repeated information
let q = ["What is your ","'s name?", "'s employee ID", "'s email address",  "Would you like to add an engineer or intern, or finish building your team?"]
let man = "Team Manager"
let eng = "Engineer"
let int = "interns"
let menuOptions = ["Add Engineer", "Add Intern", "Finish your Team!"]

//global varibles that are used in a few places
 let manHtml =""
 let engineersArray=[]
 let internsArray=[]
 //manager inquirer promts/  The start point of the app
 const startForm = () =>{
     return inquirer.prompt([
     {type: "input",
     name: "name",
     message:q[0] + man + q[1]
     },
     {type: "input",
         name: "id",
         message:q[0] + man + q[2],
     },
     {type: "input",
         name: "email",
         message:q[0] + man + q[3],
     },
     {type: "input",
         name: "officeNum",
         message:"What is Your Team managers office number"
     },
     {type: "list",
         name: "continue",
         message:q[4],
         choices: menuOptions
 
     },
 ])
 .then((answers) => {
     //this variable is awkwardly tabbed to make the generated html tab properly
     const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNum)
     manHtml = 
     `<article class="col-2 bg-secondary m-5 shadow infoHolder" >
                             <h2 class="p-3 bg-info bg-opacity-75 rounded-top-3 infoTop">Team Manager</h2>
                             <div class = "bg-secondary p-4 text-white infoBottom">
                                 <h3 class="fs-6">${manager.getName()}</h3>
                                 <h3 class="fs-6">id: ${manager.getId()}</h3>
                                 <a href = "mailto:${manager.getEmail()}" class="fs-6 text-white">${manager.getEmail()}</a>
                                 <h3 class="fs-6">Office: ${manager.getOfficeNumber()}</h3>
                             </div>
                         </article>
                         `
     if(answers.continue == "Add Engineer"){
         addEng();
     }
     else if (answers.continue == "Add Intern"){
         addInt();
     }
     else {
         makeHtml();
     }
     return manHtml
 })
 
 } 
 //engineer inquirer prompts
 let addEng = () =>{
    return  inquirer.prompt([
        {type: "input",
        name: "name",
        message:q[0] +eng +q[1],
        },
        {type: "input",
            name: "id",
            message:q[0] + eng + q[2],
        },
        {type: "input",
            name: "email",
            message:q[0] + eng + q[3],
        },
        {type: "input",
            name: "gitHub",
            message:"What is your Engineer's Github username?",
        },
        {type: "list",
            name: "continue",
            message:q[4],
            choices: menuOptions,
        }
    ])
    .then((answers) => {
        //generating the html with the answers and then pushing it on to the engineersArray
        let eng = new Engineer(answers.name, answers.id, answers.email, answers.gitHub)
        let engineer = 
`<article class="col-2 bg-secondary m-5 shadow infoHolder" >
                        <h2 class="p-3 pb-5 bg-info bg-opacity-75 rounded-top-3 infoTop">Engineer</h2>
                        <div class = "bg-secondary p-4 text-white infoBottom">
                            <h3 class="fs-6">${eng.getName()}</h3>
                            <h3 class="fs-6">id: ${eng.getId()}</h3>
                            <a href = "mailto:${eng.getEmail()}" class="fs-6 text-white">${eng.getEmail()}</a>
                            <a href = "https:github.com/${eng.getGit()}" target = "_blank" class="fs-6 text-white">${eng.getGit()}</a>
                        </div>
                    </article>
                    `

        engineersArray.push(engineer)
        //menu logic
        if(answers.continue == "Add Engineer"){
            addEng();
        }
        else if (answers.continue == "Add Intern"){
            addInt();
        }
        else {
            makeHtml();
        }
        })
        
    }
    //Intern inquirer prompts
    let addInt = () => {
        inquirer.prompt([
            {type: "input",
            name: "name",
            message:q[0] + int +q[1],
            },
            {type: "input",
                name: "id",
                message:q[0] + int + q[2],
            },
            {type: "input",
                name: "email",
                message:q[0] + int + q[3],
            },
            {type: "input",
                name: "school",
                message:"Where does your Intern Attend school?",
            },
            {type: "list",
                name: "continue",
                message:q[4], 
                choices: menuOptions,
            }
        ])
        .then((answers) => {
            //generating Intern html section, and pushing it to the interns Array
            let int = new Intern(answers.name, answers.id, answers.email, answers.school)
            var intern = `<article class="col-2 bg-secondary m-5 shadow infoHolder">
                        <h2 class="p-3 pb-5 bg-info bg-opacity-75 rounded-top-3 infoTop">Intern</h2>
                        <div class = "bg-secondary p-4 text-white infoBottom">
                            <h3 class="fs-6">${int.getName()}</h3>
                            <h3 class="fs-6">id: ${int.getId()}</h3>
                            <a href = "mailto:${int.getEmail()}" class="fs-6 text-white">${int.getEmail()}</a>
                            <h3 class="fs-6 pt-2">${int.getSchool()}</h3>
                        </div>
                        
                    </article>`
            internsArray.push(intern)
            //menu logic
            if(answers.continue == "Add Engineer"){
                addEng();
            }
            else if (answers.continue == "Add Intern"){
                addInt();
            }
            else {
                makeHtml();
            }
        })
    }

    let makeHtml = () => {
        let engineersHtml = ""
        let internsHtml = ""
        // loops through engineer and intern arrays combining them into their respective variables above
        for(let i = 0 ; i < engineersArray.length ; i++){
            engineersHtml += engineersArray[i]

        }
        for(let x = 0 ; x < internsArray.length ; x++){
            internsHtml += internsArray[x]
        }

        //combines all html segments with the main body of the html page and then writes it into the dist folder
        let baseHtml = `<!DOCTYPE html>
        <html lang='en'>
        
            <head>
                <meta charset='utf-8'>
                <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                <title>group finder</title>
                <link href='https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css' rel='stylesheet' integrity='sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3' crossorigin='anonymous'>
                <link rel="stylesheet" href="style.css" />
            <body class = "bg-secondary bg-gradient bg-opacity-50">
                <header class="container-fluid bg-danger bg-gradient bg-opacity-75">
                    <h1 class="d-flex justify-content-center p-5 mb-3 ">My Team</h1>
                </header>
                <section class="container d-flex justify-content-center flex-wrap">
                    ${manHtml}
                    ${engineersHtml}
                    ${internsHtml}
                </section>
                <script src='https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js' integrity='sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p' crossorigin='anonymous'></script>
            </body>
            
        </html>`
        writeFileAsync("./dist/team.html", baseHtml)
        writeFileAsync("./dist/style.css", css)
}

 let css = `html{
    height: 100%
}
body{
    height: 100%
}
/* rounds off the info cards, Bootstraps rounding isnt round enough for my taste*/
.infoHolder{
    border-radius: 20px;
}

.infoTop{
    border-radius: 20px 20px 0px 0px;
}

.infoBottom{
    border-radius: 0px 0px 20px 20px;
}
`
startForm();