
// geography
// https://opentdb.com/api.php?amount=8&category=22&difficulty=medium&type=multiple

// animals
// https://opentdb.com/api.php?amount=8&category=27&difficulty=medium&type=multiple

// sports
// https://opentdb.com/api.php?amount=8&category=21&difficulty=medium&type=multiple


function getQuestions() {

    var queryURL = "https://opentdb.com/api.php?amount=8&category=" + 21 + "&difficulty=medium&type=multiple&encode=url3986";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (answer) {

        var arrayBack = answer;

        var arrayBackFirst = decodeURIComponent(arrayBack.results[0].question);

        var imageSearch = decodeURIComponent(arrayBack.results[0].correct_answer);
        var imageUrl = "https://source.unsplash.com/weekly?" + arrayBack.results[0].correct_answer;
        var imageUrl2 = imageUrl + "," + arrayBack.results[0].question;

        var Answer1 = imageSearch;
        var Answer2 = decodeURIComponent(arrayBack.results[0].incorrect_answers[0]);
        var Answer3 = decodeURIComponent(arrayBack.results[0].incorrect_answers[1]);
        var Answer4 = decodeURIComponent(arrayBack.results[0].incorrect_answers[2]);

        positionAnswer = Math.floor(Math.random() * 4);
        if (positionAnswer = 1) {
            var Show1 = Answer1;
            var Show2 = Answer2;
            var Show3 = Answer3;
            var Show4 = Answer4;
        }
        else if (positionAnswer = 2) {
            var Show2 = Answer1;
            var Show1 = Answer2;
            var Show3 = Answer3;
            var Show4 = Answer4;
        }
        else if (positionAnswer = 3) {
            var Show3 = Answer1;
            var Show1 = Answer2;
            var Show2 = Answer3;
            var Show4 = Answer4;
        }
        else {
            var Show4 = Answer1;
            var Show1 = Answer2;
            var Show2 = Answer3;
            var Show3 = Answer4;
        }

        $("#answerButtons").empty();
        $("#answerButtons").append("<p class='lead'><a href='#' class='btn btn-lg btn-secondary' id='startButton'>"
            + Show1 + "</a> </p>");
        $("#answerButtons").append("<p class='lead'><a href='#' class='btn btn-lg btn-secondary' id='startButton'>"
            + Show2 + "</a> </p>");
        $("#answerButtons").append("<p class='lead'><a href='#' class='btn btn-lg btn-secondary' id='startButton'>"
            + Show3 + "</a> </p>");
        $("#answerButtons").append("<p class='lead'><a href='#' class='btn btn-lg btn-secondary' id='startButton'>"
            + Show4 + "</a> </p>");


        // $("#trivia").text(JSON.stringify(answer));
        $("#trivia").text(arrayBackFirst);
        console.log(arrayBack);
        console.log(arrayBackFirst);
        console.log(arrayBack.results.length);
        console.log(imageUrl);
        console.log(imageUrl2);
        console.log(Answer2);
    });
}

$(document).on("click", "#startButton", getQuestions);

//   function getImage(key) {

//     https://source.unsplash.com/weekly?water
// https://images.unsplash.com/photo-1446704477871-62a4972035cd?fit=crop&fm=jpg&h=800&q=50&w=1200
//   }