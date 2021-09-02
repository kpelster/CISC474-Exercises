$(document).ready(function(){
    console.log("ready");
});


$("#go").on("click", function(){
    $("#jumbotron").html(
                    "Name: " + 
                    $("#fname").val() + 
                    " " + 
                    $("#lname").val());
    return false;
});