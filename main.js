$(document).ready(function () {
  var animals = ["Cat", "Dog", "Elephant"];
  renderButtons();

  $("#add-animal").on("click", function (event) {
    event.preventDefault();
    var newAnimal = $("#animal-input").val();
    animals.push(newAnimal);

    renderButtons();
  });

  function renderButtons() {
    var animalDiv = $("#animal-div");
    animalDiv.empty();

    for (var i = 0; i < animals.length; i++) {
      var button = $("<button>");
      button.text(animals[i]);
      button.attr("data-animal", animals[i]);
      animalDiv.append(button);
    }

    //gifs
    $("button").on("click", function () {
      var instructions = $("#instructions").text(
        "Double click a gif to pause, re-click to start again"
      );
      var animal = $(this).attr("data-animal");

      // query with animal name
      var queryURL =
        "https://api.giphy.com/v1/gifs/search?q=" +
        animal +
        "&api_key=dc6zaTOxFJmzC&limit=12";

      // ajax request
      $.ajax({
        url: queryURL,
        method: "GET",
      })
        // data back
        .then(function (response) {
          var results = response.data;

          for (var i = 0; i < results.length; i++) {
            var animalDiv = $("<div>");
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var animalImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            animalImage.attr("src", results[i].images.fixed_height.url);
            animalImage.addClass("gif", "class= col-4 col-md-2");
            animalImage.attr("data-state", "still");
            animalImage.attr(
              "data-animate",
              results[i].images.fixed_height.url
            );
            animalImage.attr(
              "data-still",
              results[i].images.fixed_height_still.url
            );

            // Appending the paragraph and image tag to the animalDiv
            animalDiv.append(animalImage);
            animalDiv.append(p);

            $("#gifs-appear-here").prepend(animalDiv);
          }

          // pausing gifs
          $(".gif").on("click", function () {
            var state = $(this).attr("data-state");

            if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            }
          });
        });
    });
  }
});
