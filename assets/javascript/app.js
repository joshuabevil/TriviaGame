$(document).ready(function(){

    $("#start-button").on("click", gameState.startTimer);
  
  });
  
  var gameState = {

    timeRemaining : 60,

    startTimer: function() {
      $("#timer").text("Time remaining: " + gameState.timeRemaining);
      setInterval(gameState.countdown, 1000);
      $("#start-page").hide();
      trivia.displayQuestions();
    },

    countdown: function() {
      gameState.timeRemaining--;
      $("#timer").text("Time remaining: " + gameState.timeRemaining);
      if (gameState.timeRemaining === 0) {
        gameState.stopTimer();
        $("#timer").empty();
      }
    },

    stopTimer: function() {
      clearInterval();
      trivia.checkAnswers();
    },

    showEndPage: function(numCorrect, numIncorrect, numUnanswered) {
      $("#end-page").show();
      $("#questions-box").empty();
      $("#timer").empty();
      $("#timer").hide();
      $("#correct-answers").text("Correct answers: " + numCorrect);
      $("#incorrect-answers").text("Incorrect answers: " + numIncorrect);
      $("#unanswered").text("Skipped questions: " + numUnanswered);
    }
  }

  var trivia = {

    displayQuestions: function() {
      var divContainer = $("#questions-box");
      var answerGroup = $(".form-check");
      divContainer.append('<h2>Answer the following questions:</h2>');
              
      for (var i = 0; i < questionBank.length; i++) {
  
        divContainer.append('<div id="question">' + questionBank[i].question + '</div>');
  
        var answer1 = questionBank[i].answers[0];
        var answer2 = questionBank[i].answers[1];
        var answer3 = questionBank[i].answers[2];
  
        divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer1 + '</label></div>');
        divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer2 + '</label></div>');
        divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer3 + '</label></div>');
      }

      var doneButton = '<button class="btn btn-primary" id="done-button" type="submit">Done</button>';
      divContainer.append(doneButton);
      $("#done-button").on("click", gameState.stopTimer);
    },
  
    checkAnswers: function() {
      var correctAnswer;
      var userAnswer;
      var numCorrect = 0;
      var numIncorrect = 0;
      var numUnanswered = 0;
  

      for (var i = 0; i < questionBank.length; i++) {
        correctAnswer = questionBank[i].correct;
        userAnswer = $('input[id=radio'+i+']:checked + label').text();
  
        if (userAnswer === correctAnswer) {
          numCorrect++;
        } else if (userAnswer === "") {
          numUnanswered++;
        } else if (userAnswer !== correctAnswer) {
          {
            numIncorrect++;
          }
        }
      }

      gameState.showEndPage(numCorrect, numIncorrect, numUnanswered);
    },
  }
  
  var questionBank =
  [
    {
      question: "What is the capital of Australia?",
      answers: ["Sydney", "Melbourne", "Canberra"],
      correct: "Canberra"
    },
  
    {
      question: "What is Earth's largest continent?",
      answers: ["Antarctica", "Asia", "Africa"],
      correct: "Asia"
    },
    {
      question: "What razor-thin country accounts for more than half of the western coastline of South America?",
      answers: ["Chile", "Peru", "Argentina"],
      correct: "Chile"
    },
    {
      question: "What river runs through Baghdad?",
      answers: ["Karun", "Jordan", "Tigris"],
      correct: "Tigris"
    },
    {
      question: "What country has the most natural lakes?",
      answers: ["USA", "Canada", "Russia"],
      correct: "Canada"
    },
    {
      question: "What is the driest place on Earth?",
      answers: ["Death Valley", "Antarctica", "Egypt"],
      correct: "Antarctica"
    },
    {
      question: "In what country can you visit Machu Picchu?",
      answers: ["Peru", "Bolivia", "Brazil"],
      correct: "Peru"
    },
    {
      question: "Which African nation has the most pyramids?",
      answers: ["Egypt", "Sudan", "Algeria"],
      correct: "Sudan"
    },
    {
      question: "What is the oldest city in the world?",
      answers: ["Jericho", "Athens", "Damascus"],
      correct: "Damascus"
    },
    {
      question: "Which U.S. state has the most active volcanoes?",
      answers: ["Alaska", "Hawaii","California"],
      correct: "Alaska"
    }
  ]