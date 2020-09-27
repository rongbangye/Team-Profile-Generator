const inquirer = require("inquirer");
const fs = require("fs");
const Engineer = require("./lib/Engineer");
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");

const employees = [];

function initializePrompt() {
  const html = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
      <title>Team Profile</title>
  </head>
  <body>
      <nav class="navbar navbar-dark bg-dark mb-5">
          <span class="navbar-brand mb-0 h1 w-100 text-center">Team Profile</span>
      </nav>
      <div class="container">
          <div class="row">`;
  fs.writeFile("./output/team.html", html, function(error) {
    if (error) {
      console.log(error);
    }
  });

  addTeamMember();
}

function addTeamMember() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Welcome to Team Generator, please select team member's role",
        choices: ["Engineer", "Manager", "Intern"],
        name: "role"
      },
      {
        message: "Enter team member's name: ",
        name: "name"
      },
      {
        message: "Enter team member's ID: ",
        name: "id"
      },
      {
        message: "Enter team member's email address: ",
        name: "email"
      }
    ])
    .then(function({ role, name, id, email }) {
      let memberRole = "";
      if (role === "Engineer") {
        memberRole = "Github";
      } else if ((role = "Manager")) {
        memberRole = "Office Phone Number";
      } else {
        memberRole = "School Name";
      }
      inquirer
        .prompt([
          {
            message: `Enter ${name}'s ${memberRole}`,
            name: "memberRole"
          },
          {
            type: "list",
            message: "Do you want to add more team member?",
            choices: ["Yes", "No"],
            name: "addMoreMember"
          }
        ])
        .then(function({ memberRole, addMoreMember }) {
          let newMember;
          if (role === "Engineer") {
            newMember = new Engineer(name, id, email, memberRole);
          } else if (role === "Manager") {
            newMember = new Manager(name, id, email, memberRole);
          } else {
            newMember = new Intern(name, id, email, memberRole);
          }
          employees.push(newMember);
          addMemberHTML(newMember);
        });
    });
}

function addMemberHTML(member) {
  return new Promise(function(resolve, reject) {
    const name = member.getName();
    const role = member.getRole();
    const id = member.getId();
    const email = member.getEmail();
    let data = "";
    if (role === "Engineer") {
      const gitHub = member.getGithub();
      data = `<div class="col-6">
        <div class="card mx-auto mb-3" style="width: 18rem">
        <h5 class="card-header">${name}<br /><br />Engineer</h5>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">ID: ${id}</li>
            <li class="list-group-item">Email Address: ${email}</li>
            <li class="list-group-item">GitHub: ${gitHub}</li>
        </ul>
        </div>
    </div>`;
    } else if (role === "Intern") {
      const school = member.getSchool();
      data = `<div class="col-6">
        <div class="card mx-auto mb-3" style="width: 18rem">
        <h5 class="card-header">${name}<br /><br />Intern</h5>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">ID: ${id}</li>
            <li class="list-group-item">Email Address: ${email}</li>
            <li class="list-group-item">School: ${school}</li>
        </ul>
        </div>
    </div>`;
    } else {
      const officePhone = member.getOfficeNumber();
      data = `<div class="col-6">
        <div class="card mx-auto mb-3" style="width: 18rem">
        <h5 class="card-header">${name}<br /><br />Manager</h5>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">ID: ${id}</li>
            <li class="list-group-item">Email Address: ${email}</li>
            <li class="list-group-item">Office Phone: ${officePhone}</li>
        </ul>
        </div>
    </div>`;
    }
    console.log("adding team member");
    fs.appendFile("./output/team.html", data, function(err) {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
}

initializePrompt();
