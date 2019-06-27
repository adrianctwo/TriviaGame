var Questions = [{
    question: "What is my name?",
    answerChoices: ["A", "B", "C", "D"],
    answer: 0
},{
    question: "what is my last name?",
    answerChoices: ["A", "B", "C", "S"],
    answer: 3
}]

$("#start").on("click", function(){
    $(this).hide();
    startGame();
});

var currentQuestion;
var numCorrectAnswer;
var numIncorrectAnswer;
var notAnswer;
function startGame(){
    currentQuestion = 0;
    numCorrectAnswer = 0;
    numIncorrectAnswer = 0;
    notAnswer = 0;
}
