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
      <nav class="navbar navbar-dark bg-danger mb-5" style="height: 90px">
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
      } else if (role === "Manager") {
        memberRole = "Office Phone Number";
      } else if (role === "Intern") {
        memberRole = "School Name";
      } else {
        console.log("Please select team member's Role");
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
          } else if (role === "Intern") {
            newMember = new Intern(name, id, email, memberRole);
          } else {
            console.log("Error");
          }
          employees.push(newMember);
          addMemberHTML(newMember).then(function() {
            if (addMoreMember === "Yes") {
              addTeamMember();
            } else {
              finishedAPP();
            }
          });
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
      const list = "Github";
      data = addHTML(name, id, email, gitHub, list, role);
    } else if (role === "Intern") {
      const school = member.getSchool();
      const list = "school";
      data = addHTML(name, id, email, school, list, role);
    } else {
      const officePhone = member.getOfficeNumber();
      const list = "Office Number";
      data = addHTML(name, id, email, officePhone, list, role);
    }

    fs.appendFile("./output/team.html", data, function(err) {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
}

function addHTML(name, id, email, roleDetail, list, role) {
  if (role === "Engineer") {
    let data = `<div class="col-6">
      <div class="card mx-auto mb-5" style="width: 18rem">
      <h5 class="card-header bg-primary text-white">
        ${name}
        <br />
        <br />
        ${role}
      </h5>
      <ul class="list-group list-group-flush" id="list-group">
          <li class="list-group-item">ID: ${id}</li>
          <li class="list-group-item">Email Address: <a href = "mailto:${email}" target="_blank">${email}</a>
          </li>
          <li class="list-group-item">${list}: <a href="https://github.com/${roleDetail}" target="_blank">${roleDetail}</a></li>
      </ul>
      </div>
      </div>`;
    return data;
  } else {
    let data = `<div class="col-6">
      <div class="card mx-auto mb-5" style="width: 18rem">
      <h5 class="card-header bg-primary text-white">
        ${name}
        <br />
        <br />
        ${role}
      </h5>
      <ul class="list-group list-group-flush" id="list-group">
          <li class="list-group-item">ID: ${id}</li>
          <li class="list-group-item">Email Address: <a href="mailto:${email}" target="_blank">${email}</a>
          </li>
          <li class="list-group-item">${list}: ${roleDetail}</li>
      </ul>
      </div>
      </div>`;
    return data;
  }
}

function finishedAPP() {
  const html = ` </div>
  </div>
  
  </body>
  </html>`;

  fs.appendFile("./output/team.html", html, function(err) {
    if (err) {
      console.log(err);
    }
  });
  console.log("Exit the application, and the HTML is generated");
}

initializePrompt();
