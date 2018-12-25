
// Teams API hosted on Heroku 
const urlEndPoint = "https://shielded-tundra-29086.herokuapp.com/";

$(document).ready(function(){
    // variable employeesModel to assign a value 
    // will be the 'view model' for current 'employees' view 
    let employeesModel;
    
    // Defines a Lodash template 
    let rowTemplate = _.template(
        '<% _.forEach(employees, function(employee) { %>' +
        '<div class="row body-row" data-id=<%- employee._id %>>' + 
            '<div class="col-xs-4 body-column"><%- employee.FirstName %></div>' + 
            '<div class="col-xs-4 body-column"><%- employee.LastName %></div>' + 
            '<div class="col-xs-4 body-column"><%- employee.Position.PositionName %></div>' + 
        '</div>' +
    '<% }); %>');
    

    // will populate the "employeesModel" array
    function initializeEmployeesModel(){
        $.ajax({
            url: urlEndPoint + 'employees',
            method: 'GET',
            contentType: 'application/json'
        }).done(function(data){
            // Assign the result data to the "employeesModel" variable
            // causing it to be populated with all 300 employees 
            employeesModel = _.take(data, 300);
            refereshEmployeeRows(employeesModel);

        }).fail(function(err){
            console.log("Error: " + err.statusText);
            showGenericModal('Error', 'Unable to get Employees');
        });
    }

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

    function refereshEmployeeRows(employees){
        let empRow = rowTemplate({ 'employees' : employees });
        let employeeTable = $("#employees-table");
        // "employeeTable" is cleared of any existing "body-row" elements, 
        // before adding any new ones
        employeeTable.empty();
        employeeTable.append(empRow);
    }

    function getFilteredEmployeesModel(filterString){
        let filterData = _.filter(employeesModel, function(employee){
            if(employee.FirstName.toUpperCase().indexOf(filterString.toUpperCase()) != -1 ||
                employee.LastName.toUpperCase().indexOf(filterString.toUpperCase()) != -1 ||
                employee.Position.PositionName.toUpperCase().indexOf(filterString.toUpperCase()) != -1)
            {
                return true;
            }
            else
                return false;

        });
        return filterData;
    }

    function getEmployeeModelById(id){
        let index = _.findIndex(employeesModel, function(employee){
            return employee._id === id;
        });

        if (index != -1) return _.cloneDeep(employeesModel[index]);
        else null;
    }

    // When the DOM is ready, we need to perform some initial tasks 
    // wiring up events and populating the page with data 
    
    // to fetch the data and populate our employees table
    initializeEmployeesModel();

    // Wiring up the "keyup" event for the Search Field
    $("#employee-search").on("keyup", function(value){
        // get current value of the "search field"
        let data = $("#employee-search").val();
        
        // show only "filtered" rows to the user
        refereshEmployeeRows(getFilteredEmployeesModel(data));

        // wiring up the "click" event for every single elements with class "body-row"
        $(".bootstrap-header-table").on("click", ".body-row", function(){
            let $empId = $(this).attr("data-id");
            let clickedEmp = getEmployeeModelById($empId);

            let hiredDate = moment(clickedEmp.HireDate).format("LL");
            clickedEmp.HireDate = hiredDate;
           

            let modalTemplate = _.template(
                '<strong>Address:</strong> <%- employee.AddressStreet %> <%- employee.AddressCity %> <%- employee.AddressState %> <%- employee.AddressZip %><br>' +
                '<strong>Phone Number:</strong> <%-employee.PhoneNum %> Ext.<%-employee.Extension %><br>' + 
                '<strong>Hire Date:</strong> <%- employee.HireDate %>');
            
            showGenericModal(
                clickedEmp.FirstName + " " + clickedEmp.LastName,
                modalTemplate({ 'employee': clickedEmp })
            );
        });
    });
});