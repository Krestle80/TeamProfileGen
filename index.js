const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const Intern = require('./lib/Intern')
const Engineer = require('./lib/Engineer')
const Manager = require('./lib/Manager')
const Ee = require('./lib/Ee')


const writeFileAsync = util.promisify(fs.writeFile);

let q = ["What is your ", "employee ID", "email address", "Team managers office number", "Would you like to add an engineer or intern, or finish building your team?", "What is their Github username?", "Where do they go to school?"]
let man = "Team Manager"
let eng = "Engineer"
let int = "interns"
let menuOptions = ["Add Engineer", "Add Intern", "Finish your Team!"]

 let manHtml =""
 let engineersHtml = ""
 let engineersArray=[]
 let internsHtml = ""
 let internsArray=[]
 
 const startForm = () =>{
     return inquirer.prompt([
     {type: "input",
     name: "name",
     message:q[0] + man + "'s name?"
     },
     {type: "input",
         name: "id",
         message:man + " " + q[1],
     },
     {type: "input",
         name: "email",
         message:man + " " + q[2],
     },
     {type: "input",
         name: "officeNum",
         message:q[3],
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
     `<article class="col-2 bg-secondary m-5 shadow" style="border-radius:20px" >
                             <h2 class="p-3 bg-info bg-opacity-75 rounded-top-3" style="border-radius: 20px 20px 0px 0px;">Team Manager</h2>
                             <div class = "bg-secondary p-4 text-white" style="border-radius: 0px 0px 20px 20px;">
                                 <h3 class="fs-5">${manager.getName()}</h3>
                                 <h3 class="fs-5">id: ${manager.getId()}</h3>
                                 <a href = "mailto:${manager.getEmail()}" class="fs-5 text-white">${manager.getEmail()}</a>
                                 <h3 class="fs-5">Office: ${manager.getOfficeNumber()}</h3>
                             </div>
                         </article>
                         `
 console.log(manHtml)
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
 
 let addEng = () =>{
    return  inquirer.prompt([
        {type: "input",
        name: "name",
        message:q[0] +eng +"'s name",
        },
        {type: "input",
            name: "id",
            message:eng + q[1],
        },
        {type: "input",
            name: "email",
            message:eng + q[2],
        },
        {type: "input",
            name: "gitHub",
            message:q[5],
        },
        {type: "list",
            name: "continue",
            message:q[4],
            choices: menuOptions,
        }
    ])
    .then((answers) => {
        let eng = new Engineer(answers.name, answers.id, answers.email, answers.gitHub)
        let engineer = 
`<article class="col-2 bg-secondary m-5 shadow" style="border-radius:20px" >
                        <h2 class="p-3 bg-info bg-opacity-75 rounded-top-3" style="border-radius: 20px 20px 0px 0px;">Engineer</h2>
                        <div class = "bg-secondary p-4 text-white" style="border-radius: 0px 0px 20px 20px;">
                            <h3 class="fs-6">${eng.getName()}</h3>
                            <h3 class="fs-6">id: ${eng.getId()}</h3>
                            <a href = "mailto:${eng.getEmail()}" class="fs-6 text-white">${eng.getEmail()}</a>
                            <a href = "https:github.com/${eng.getGit()}" target = "_blank" class="fs-6 text-white">${eng.getGit()}</a>
                        </div>
                    </article>
                    `
        console.log(engineer, "line 129")
        engineersArray.push(engineer)
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
    let addInt = () => {
        inquirer.prompt([
            {type: "input",
            name: "name",
            message:q[0] + int +"'s name",
            },
            {type: "input",
                name: "id",
                message:int + "'s " + q[1],
            },
            {type: "input",
                name: "email",
                message:int + "'s " + q[2],
            },
            {type: "input",
                name: "school",
                message:q[7],
            },
            {type: "list",
                name: "continue",
                message:q[4],
                choices: menuOptions,
            }
        ])
        .then((answers) => {
            let int = new Intern(answers.name, answers.id, answers.email, answers.school)
            var intern = `<article class="col-2 bg-secondary m-5 shadow" style="border-radius:20px" >
                        <h2 class="p-3 bg-info bg-opacity-75 rounded-top-3" style="border-radius: 20px 20px 0px 0px;">Intern</h2>
                        <div class = "bg-secondary p-4 text-white" style="border-radius: 0px 0px 20px 20px;">
                            <h3 class="fs-6">${int.getName()}</h3>
                            <h3 class="fs-6">id: ${int.getId()}</h3>
                            <a href = "mailto:${int.getEmail()}" class="fs-6 text-white">${int.getEmail()}</a>
                            <h3 class="fs-6 pt-2">${int.getSchool()}</h3>
                        </div>
                        
                    </article>`
            internsArray.push(intern)
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
        for(let i = 0 ; i < engineersArray.length ; i++){
            engineersHtml += engineersArray[i]
            console.log(engineersArray[i])
        }
        for(let x = 0 ; x < internsArray.length ; x++){
            internsHtml += internsArray[x]
        }


        let baseHtml = `<!DOCTYPE html>
        <html lang='en' style = "height:100%">
        
            <head>
                <meta charset='utf-8'>
                <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                <title>group finder</title>
                <link href='https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css' rel='stylesheet' integrity='sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3' crossorigin='anonymous'>
                <link rel="stylesheet" href="filler.css" />
            <body class = "bg-secondary bg-gradient bg-opacity-50" style = "height:100%;">
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
}

startForm();