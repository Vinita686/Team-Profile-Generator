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

// TODO: Write Code to gather information about the development team members, and render the HTML file.

//*------------ input validation functions ----------------------*//

// Function for name validation
function validateName(name) {
  const letters = /^[A-Za-z]+$/;
  return name.trim().match(letters) ? true : "Invalid input!"
}

// Function for Number validation
function validateNumber(num) {
  const numbers = /^[0-9]+$/;
  return num.match(numbers) ? true : "Enter Numerics only!" 
}

// Function for Email validation
function emailValidator(email) {
  const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return email.match(mailFormat) ? true : "Invalid Email type!"
}


// Create an empty array to store all employee objects
const employeeArray = [];

// Create a function to gather information to pass to Engineer class
function addEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the Name of Engineer.",
        name: "name",
        validate: validateName,
      },
      {
        type: "input",
        message: "Enter ID of Engineer.",
        name: "id",
        validate: validateNumber,
      },
      {
        type: "input",
        message: "Enter email of Engineer.",
        name: "email",
        validate: emailValidator,
    
      },
      {
        type: "input",
        message: "Enter GitHub username of Engineer.",
        name: "github",
      },
    ])
    .then((response) => {
      const newEngineer = new Engineer(
        response.name,
        response.id,
        response.email,
        response.github
      );
      employeeArray.push(newEngineer);
      createTeam();
    });
}

// Function to gather info and pass to Intern class
function addIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter Name of the Intern.",
        name: "name",
        validate: validateName,
      },
      {
        type: "input",
        message: "Enter ID of the Intern.",
        name: "id",
        validate: validateNumber,
      },
      {
        type: "input",
        message: "Enter Email of the Intern.",
        name: "email",
        validate: emailValidator,
      },
      {
        type: "input",
        message: "Enter School of the Intern.",
        name: "school",
      },
    ])
    .then((response) => {
      const newIntern = new Intern(
        response.name,
        response.id,
        response.email,
        response.school
      );
      employeeArray.push(newIntern);
      createTeam();
    });
}

// Function to provide menu options to user to add employee to team.
function createTeam() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Please choose from the below menu Options to make your Team.",
        choices: [
          "Add an Engineer",
          "Add an Intern",
          "Finish building the Team",
        ],
        name: "options",
      },
    ])
    .then((response) => {
      switch (response.options) {
        case "Add an Engineer":
          addEngineer();
          break;
        case "Add an Intern":
          addIntern();
          break;
        default:
          teamBuilder();
      }
    });
}

// Function to gather info and pass to Manager class.
function createManager() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Please provide Team Managers's Name.",
        name: "name",
        validate: validateName,
      },
      {
        type: "input",
        message: "Team Manager's Employee Id?",
        name: "id",
        validate: validateNumber,
      },
      {
        type: "input",
        message: "Team Manager's Email Address?",
        name: "email",
        validate: emailValidator,
      },
      {
        type: "input",
        message: "Team Manager's Office number?",
        name: "number",
        validate: validateNumber,
      },
    ])
    .then((response) => {
      const newManager = new Manager(
        response.name,
        response.id,
        response.email,
        response.number
      );
      employeeArray.push(newManager);
      //   console.log(employeeArray);
      createTeam();
    });
}

// function to make the html file using render function
function teamBuilder() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }
  fs.writeFileSync(outputPath, render(employeeArray), (err) =>
    err ? console.error(err) : console.info("Success!")
  );
}

// function to initialize the application
function init() {
  createManager();
}
init();
