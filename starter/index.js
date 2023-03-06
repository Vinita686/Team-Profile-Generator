const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
const { type } = require("os");

const employeeArray = [];

function addEngineer() {

}

function createTeam() {
    inquirer.prompt([
        {
      type: "list",
      message: "Please choose one of the below Options.",
      choices: ["Add an Engineer", "Add an Intern", "Finish building the Team"],
      name: "options",
    }
    ]).then(response => {
        switch(response.options) {
            case "Add an Engineer":
            // addEngineer()
            break;
            case "Add an Intern":
                // addIntern()
                break;
                // default: teamBuilder()
        }
    })
}
// TODO: Write Code to gather information about the development team members, and render the HTML file.
function createManager() {

  inquirer.prompt([
    {
      type: "input",
      message: "Please provide Team Managers's Name.",
      name: "name",
    },
    {
      type: "input",
      message: "Team Manager's Employee Id?",
      name: "id",
    },
    {
      type: "input",
      message: "Team Manager's Email Address?",
      name: "email",
    },
    {
      type: "input",
      message: "Team Manager's Office number?",
      name: "number",
    },
    
  ]).then(response => {
    console.log(response)
    const newManager = new Manager(response.name, response.id, response.email, response.number)
    employeeArray.push(newManager)
    console.log(employeeArray)
    createTeam();
  });
}

function teamBuilder () {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(employeeArray), 'utf-8')
}

createManager();