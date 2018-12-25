const urlEndPoint = "https://shielded-tundra-29086.herokuapp.com/";

$(document).ready(function(){
    
    $(".dropdown-menu").on("click", ".api-data", function(event){
        event.preventDefault();

        $this = $(this);

        $.ajax({
            url: urlEndPoint + $this.attr("data-query"),
            method: "GET",
            contentType: "application/json"
        }).done(function(data) {
            $("#data").empty();
            $("#data").html("<h3>" + $this.text() + "</h3>");
            $("#data").append(JSON.stringify(data)); 
        }).fail(function(err){
            console.log("error: " + err.statusText);
        });
    });
});