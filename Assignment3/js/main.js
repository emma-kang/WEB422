

// Teams API hosted on Heroku 
const urlEndPoint = "https://shielded-tundra-29086.herokuapp.com/";

// Define a viewModel for knockout.js
var viewModel = {
    teams:ko.observableArray([]), 
    employees:ko.observableArray([]),
    projects:ko.observableArray([])  
};

function showGenericModal(title, message){
    $("#genericModal").modal({
        backdrop: 'static', 
        keyboard: false
    });

    $("#modalTitle").empty();
    $("#modalMsg").empty();
    $("#modalTitle").text(title);
    $("#modalMsg").html(message);
}

function initializeTeams(){

    return new Promise((resolve, reject) => {
        $.ajax({
            url: urlEndPoint + "teams-raw",
            method: "GET",
            contentType: "application/json"
        }).done((data) => {
            viewModel.teams = ko.mapping.fromJS(data);         
            resolve();
            // resolve(data);
        }).fail((err) => {
            // reject(err);
            reject("Error loading the team data.");
        });
    });
};

function initializeEmployees(){

    return new Promise((resolve, reject) => {
        $.ajax({
            url : urlEndPoint + "employees",
            method : "GET",
            contentType : "application/json"
        }).done((data) => {
            viewModel.employees = ko.mapping.fromJS(data);
            resolve();
        }).fail((err) => {
            reject("Error loading the employee data.");
        })
    });
};

function initializeProjects(){


    return new Promise((resolve, reject) => {
        $.ajax({
            url : urlEndPoint + "projects",
            method : "GET",
            contentType : "application/json"
        }).done((data) => {
            viewModel.projects = ko.mapping.fromJS(data);
            resolve();
        }).fail((err) => {
            reject("Error loading the employee data.");
        })
    });
};

function saveTeam(){

    var currentTeam = this;

    $.ajax({
        url : urlEndPoint + "team/" + currentTeam._id(),
        method : "PUT",
        contentType : "application/json",
        data : JSON.stringify(
            {
                "Projects" : currentTeam.Projects(),
                "Employees" : currentTeam.Employees(),
                "TeamLead" : currentTeam.TeamLead()
            }
        )
    }).done((data) => {
        showGenericModal("Success", "[ " + currentTeam.TeamName() + " ]" + " Updated Successfully");
    }).fail((err) => {
        showGenericModal("Error", "Error updating the team information.");
    });
};

$(document).ready(() => {

    initializeTeams().then(initializeEmployees).then(initializeProjects).then(() => { 
        ko.applyBindings(viewModel);
        $('select.multiple').multipleSelect({filter : true});
        $('select.single').multipleSelect({single : true, filter : true});
    }).catch((err) => {
        showGenericModal("Error", err); 
    });
});









