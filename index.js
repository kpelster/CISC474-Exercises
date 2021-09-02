$(document).ready(function(){
    console.log("ready");

    $(".container").on("click", "#go", function(){
        $("#jumbotron").html(
                        "Name: " + 
                        $("#fname").val() + 
                        " " + 
                        $("#lname").val());
        return false;
    });
});


