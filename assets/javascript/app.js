
// trivia API geography is cateofory 22, animals is 27, sports is 21

var arrayBack;
var questionNumber;
var correctAnswers = 0;
var positionAnswer;


function getQuestions() {

    var queryURL = "https://opentdb.com/api.php?amount=8&category=" + 27 + "&type=multiple&encode=url3986";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (answer) {

        arrayBack = answer;
        questionNumber = 1;
        correctAnswers = 0;
        displayQuestion(questionNumber);
    });
}

function displayQuestion() {
    var i = questionNumber - 1;

    var question = decodeURIComponent(arrayBack.results[i].question);

    var imageSearch = decodeURIComponent(arrayBack.results[i].correct_answer);
    // var imageUrl = "https://source.unsplash.com/weekly?" + arrayBack.results[0].correct_answer;
    // var imageUrl2 = imageUrl + "," + arrayBack.results[0].question;

    var Answer1 = imageSearch;
    var Answer2 = decodeURIComponent(arrayBack.results[i].incorrect_answers[0]);
    var Answer3 = decodeURIComponent(arrayBack.results[i].incorrect_answers[1]);
    var Answer4 = decodeURIComponent(arrayBack.results[i].incorrect_answers[2]);

    // hide the correct answer in a random position, other responses just use the order provided
    positionAnswer = Math.floor(Math.random() * 4) + 1;
    console.log("position number is " + positionAnswer);
    $("#answerButtons").empty();

    if (positionAnswer === 1) {
        var Show1 = Answer1;
        var Show2 = Answer2;
        var Show3 = Answer3;
        var Show4 = Answer4;
    }
    else if (positionAnswer === 2) {
        var Show2 = Answer1;
        var Show1 = Answer2;
        var Show3 = Answer3;
        var Show4 = Answer4;
    }
    else if (positionAnswer === 3) {
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


    $("#answerButtons").append("<p class='lead'><a href='#' class='btn btn-lg btn-secondary' id='AnswerButton1'>"
        + Show1 + "</a> </p>");
    $("#answerButtons").append("<p class='lead'><a href='#' class='btn btn-lg btn-secondary' id='AnswerButton2'>"
        + Show2 + "</a> </p>");
    $("#answerButtons").append("<p class='lead'><a href='#' class='btn btn-lg btn-secondary' id='AnswerButton3'>"
        + Show3 + "</a> </p>");
    $("#answerButtons").append("<p class='lead'><a href='#' class='btn btn-lg btn-secondary' id='AnswerButton4'>"
        + Show4 + "</a> </p>");


    // $("#trivia").text(JSON.stringify(answer));
    $("#trivia").text(question);
    $("#questionHeader").text("Question Number # " + questionNumber);
    // console.log(arrayBack);
    // console.log(arrayBackFirst);
    // console.log(arrayBack.results.length);
    // console.log(imageUrl);
    // console.log(imageUrl2);

}

$(document).on("click", '#startButton', getQuestions);

// Calling the renderButtons function to display the intial buttons
//   renderButtons();
$(document).on("click", ".btn", isItRight);

function isItRight(answer) {
    var i = questionNumber - 1;
    // if (i < arrayBack.results.length) {
    //     break;
    // }
    console.log(i);
    console.log(arrayBack.results.length);
    if (this.text === decodeURIComponent(arrayBack.results[i].correct_answer)) {
        console.log("correct answer");
        correctAnswers++;
    }
    else {
        $(this).attr("id", "wrongPick");
    }
    questionNumber++;
    showAnswer();
    if (i < arrayBack.results.length - 1) {
        setTimeout(displayQuestion, 1000 * 2);
    }
    else { setTimeout(displayResults, 1000 * 2); }

}

function showAnswer() {
    if (positionAnswer === 1) {
        $("#AnswerButton1").attr("id", "btnCorrect");
        // $("#AnswerButton1").css("background-color","green");
    }
    if (positionAnswer === 2) {
        $("#AnswerButton2").attr("id", "btnCorrect");
        // $("#AnswerButton2").css("background-color","green");
    }
    if (positionAnswer === 3) {
        $("#AnswerButton3").attr("id", "btnCorrect");
        // $("#AnswerButton3").css("background-color","green");
    }
    if (positionAnswer === 4) {
        $("#AnswerButton4").attr("id", "btnCorrect");
        // $("#AnswerButton4").css("background-color","green");
    }

}

function displayResults() {
    console.log("display results");
    incorrectAnswers = arrayBack.results.length - correctAnswers;
    $("#answerButtons").empty();
    $("#answerButtons").append("<p class='lead'><a href='#' class='btn btn-lg btn-secondary' id='startButton'>Try Again</a></p>");
    $("#trivia").empty();
    if (correctAnswers / arrayBack.results.length > (5 / 8)) {
        $("#questionHeader").html("Well Done! <br> Correct Answers: " + correctAnswers + "<br> Incorrect Answes: " + incorrectAnswers);
    }
    else {
        $("#questionHeader").html("Try Again! <br> Correct Answers: " + correctAnswers + "<br> Incorrect Answes: " + incorrectAnswers);
    }
}

//   function getImage(key) {

    //  https://source.unsplash.com/weekly?water
// https://images.unsplash.com/photo-1446704477871-62a4972035cd?fit=crop&fm=jpg&h=800&q=50&w=1200
//   }