
// trivia API geography is cateofory 22, animals is 27, sports is 21

var arrayBack;
var questionNumber;
var correctAnswers = 0;
var positionAnswer;
var imageSearch;
var subject = 27;

$(document).on("click", '#startButton', getQuestions);

$(document).on("click", '.nav-link', newSubject);

$(document).on("click", ".btn", isItRight);


// this function call API, sets aside results to be used by other functions, initializes question counter
// this function gets called by the Begin button or Try Again button
function getQuestions() {

    var queryURL = "https://opentdb.com/api.php?amount=8&category=" + subject + "&type=multiple&encode=url3986";

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

// this function displays the next question, randomizes the order of the correct answer, and displays answers as buttons
// this function gets called after new game begins and after each question
function displayQuestion() {
    var i = questionNumber - 1;

    var question = decodeURIComponent(arrayBack.results[i].question);

    imageSearch = decodeURIComponent(arrayBack.results[i].correct_answer);

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


    $("#trivia").text(question);
    $("#questionHeader").text("Question Number #" + questionNumber + " of " + arrayBack.results.length);
    $("#Timer").text(10);
    stopwatch.reset();
    stopwatch.start();
}

// this function assigns a new subject category to be use in trivia api call, and sets category as active
// note that the category needs to be set before start of a new game, set of questions cannot be changed halfway
function newSubject() {
    console.log(this.text);
    if (this.text === 'Animals') {
        subject = 27;
        $("#Animals").attr("class", "nav-link active");
        $("#Geography").attr("class", "nav-link");
        $("#Sports").attr("class", "nav-link");
    }
    else if (this.text === 'Geography') {
        subject = 22;
        $("#Geography").attr("class", "nav-link active");
        $("#Animals").attr("class", "nav-link");
        $("#Sports").attr("class", "nav-link");
    }
    else {
        subject = 21;
        $("#Sports").attr("class", "nav-link active");
        $("#Geography").attr("class", "nav-link");
        $("#Animals").attr("class", "nav-link");

    }
}


// this function compares the selected answer to the correct answer, advances the question number
// calls the showAnswer function to display if correct/incorrect, calls getimage to display
// and calls the disableButtons function so that question is not advanced again
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
    disableButtons();
    stopwatch.stop();
    getImage();
    if (i < arrayBack.results.length - 1) {
        setTimeout(displayQuestion, 1000 * 4);
    }
    else { setTimeout(displayResults, 1000 * 4); }

}

//this function formats the anwer buttons as correct or incorrect
function showAnswer() {

    if (positionAnswer === 1) {
        $("#AnswerButton1").attr("id", "btnCorrect");
    }
    if (positionAnswer === 2) {
        $("#AnswerButton2").attr("id", "btnCorrect");
    }
    if (positionAnswer === 3) {
        $("#AnswerButton3").attr("id", "btnCorrect");
    }
    if (positionAnswer === 4) {
        $("#AnswerButton4").attr("id", "btnCorrect");
    }


}

//this function executed at end of set of questions and displays number of correct/incorrect answers
function displayResults() {
    console.log("display results");
    incorrectAnswers = arrayBack.results.length - correctAnswers;
    $("#Timer").text("");
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

//this function disables buttons after choosing an answer
function disableButtons() {
    console.log("disable button fuction");
    $("#AnswerButton1").css("pointer-events", "none");
    $("#AnswerButton2").css("pointer-events", "none");
    $("#AnswerButton3").css("pointer-events", "none");
    $("#AnswerButton4").css("pointer-events", "none");
    $("#btnCorrect").css("pointer-events", "none");
    $("#wrongPick").css("pointer-events", "none");

}

// this function will display an image based on the search term of the correct answer
// no ajax is needed for this, simply add the search term to the url
// at times the site will not find a good picture and display a generic "no results found" image.
// improvement in the future is to actually make an API call based on one or more search criteria
// and select the best photo to display i.e. to avoid showing the error image

function getImage(key) {
    var queryURL = "url(https://source.unsplash.com/weekly?" + encodeURIComponent(imageSearch) + ")";
    console.log(queryURL);
    $("body").css("background-image", queryURL);
    setTimeout(function () { $("body").css("background-image", "none") }, 1000 * 4);

    // this second call uses the question itself as the search term instead of the correct answer
    var question = decodeURIComponent(arrayBack.results[questionNumber - 2].question);
    var queryURL2 = "url(https://source.unsplash.com/weekly?" + encodeURIComponent(question) + ")";
    console.log(queryURL2);

}


// timer
var clockRunning = false;
var intervalId;

// Our stopwatch object
var stopwatch = {

    // time: 10,

    reset: function () {
        clearInterval(intervalId);
        stopwatch.time = 10;
        $("#Timer").text(stopwatch.time);
    },

    start: function () {

        // DONE: Use setInterval to start the count here and set the clock to running.
        if (!clockRunning) {
            intervalId = setInterval(stopwatch.count, 1000);
            clockRunning = true;
            $("#Timer").css("color", "inherit");
        }
    },
    stop: function () {
        clearInterval(intervalId);
        clockRunning = false;
        if (stopwatch.time>0) {$("#Timer").css("color", "gray");}
        // $("#Timer").text("");
    },
    count: function () {
        // DONE: decrease time by 1
        stopwatch.time --;
        $("#Timer").text(stopwatch.time);
        if (stopwatch.time <1) {
            $("#Timer").css("color", "red");
            stopwatch.stop();
            showAnswer();
            disableButtons();
            getImage();
            if (questionNumber < arrayBack.results.length ) {
                console.log("question number" + questionNumber + "array l" + arrayBack.results.length);
                setTimeout(displayQuestion, 1000 * 4);
                questionNumber++;
            }
            else { setTimeout(displayResults, 1000 * 4); }
                }
    }
};
