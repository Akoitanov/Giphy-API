$( document ).ready(function() {
//array
var actions = ["batman", "superman", "thor", "spiderman", "ironman", "spongebob", "patrick"];
//creating functions that display gifs
function ShowGifButtons(){
    $("#gifButtonsView").empty();
    for (var i = 0; i < actions.length; i++){
        var gifButton = $("<button>");
        gifButton.addClass("action");
        gifButton.addClass("btn btn-primary")
        gifButton.attr("data-name", actions[i]);
        gifButton.text(actions[i]);
        $("#gifButtonsView").append(gifButton);
    }
}
//creating function that creating new buttons
function CrtNewButton(){
    $("#addGif").on("click", function(){
        var action = $("#action-input").val().trim();
        if (action == "") {
            return false;
        }
        actions.push(action);

        ShowGifButtons();
        return false;
    });
}
//creating function that removing all adding buttons
function removeAllButtons(){
    $("removeGif").on("click", function(){
        actions.pop(action);
        ShowGifButtons();
        return false;
    });
}
//Creating a function that displays all gifs
function displayGifs(){
    var action = $(this).attr("data-name");
    var queryURL = "https://developers.giphy.com/dashboard/" + action + "&api_key=7T56bSapNnlCzh00VrOl4VyWIR9aCrm7";
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method:'Get'
    })
    //responsible for search part
    .done(function(response){
        console.log(response);
        $("#gifsView").empty();
        var results = response.data;
        if (results == ""){
            alert("No Gifs DUDE,try something else");
        }
        for (var i=0; i<results.length; i++){
           //responsible for creating a div for a gifs
            var gifDiv = $("<div>");
            gifDiv.addClass("gifDiv");
            //this will sort ratings
            var gifRating = $("<p>").text("Rating: " + results[i].rating);
            gifDiv.append(gifRating);
            //this sort gifs
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_small_still.url);
            gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);
            gifImage.attr("data-animate", results[i].images.fixed_height_small.url);
            gifImage.attr("data-state", "still");
            gifImage.addClass("image");
            gifDiv.append(gifImage);
            $("#gifsView").prepend(gifDiv);
        }
    });
}
//calling functions
ShowGifButtons();
CrtNewButton();
removeAllButtons;

$(document).on("click", ".action", displayGifs);
$(document).on("click", ".image", function(){
    var state = $(this.attr('data-state');
    if( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
});
