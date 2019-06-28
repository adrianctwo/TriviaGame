var lolQuestions = [{
    question: "What is your name?",
    multipleChoice: ["A", "B", "C" , "D"],
    answerKey: 0
},{
    question: "What is your last name?",
    multipleChoice: ["S", "D", "A", "K"],
    answerKey: 0
}]

$("#start").on("click", function(){
	$(this).hide();
	play();
});

var currentQuestion;
var numCorrectAnswer; 
var numIncorrectAnswer; 
var numNotAnswered; 

function play(){

    $("#result").empty();
    currentQuestion = 0;

    $("#numCorrectAnswers").empty();
    numCorrectAnswer = 0;

    $("#numIncorrectAnswers").empty();
    numIncorrectAnswer = 0;

    $("#numNotAnswered").empty();
    numNotAnswered = 0;

	newQuestion();
}

var selectedAnswer;
var seconds; 
var time; 
var answered; 
function newQuestion(){
	$("#message").empty();
	$("#correctedAnswer").empty();
	answered = true;
	
	//sets up new questions & answerList
	$("#currentQuestion").html("Question #" + (currentQuestion+1) + "/" + lolQuestions.length);
	$(".question").html("<p>" + lolQuestions[currentQuestion].question + "</p>");
	for(var i = 0; i < 4; i++){
		var multipleChoices = $("<div>");
        multipleChoices.text(lolQuestions[currentQuestion].multipleChoice[i]);
        multipleChoices.addClass("choice");
		multipleChoices.attr({"data-index": i });
		$(".answerChoices").append(multipleChoices);
    }
    
	timer();
	//clicking an answer will pause the time and setup answerPage
	$(".choice").on("click",function(){
		selectedAnswer = $(this).data("index");
		clearInterval(time);
		result();
	});
}

function timer(){
	seconds = 20;
	$("#timer").html("<p>Time Remaining: " + seconds + "</p>");
	answered = true;
	//sets timer to go down
	time = setInterval(timerDisplay, 1000);
}

function timerDisplay(){
	seconds--;
	$("#timer").html("<p>Time Remaining: " + seconds + "</p>");
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		result();
	}
}

function result(){
    $("#currentQuestion").empty();
    $(".question").empty();
	$(".choice").empty();

	var rightAnswerText = lolQuestions[currentQuestion].multipleChoice[lolQuestions[currentQuestion].answerKey];
	var rightAnswerIndex = lolQuestions[currentQuestion].answerKey;
	//checks to see correct, incorrect, or unanswered
	if((selectedAnswer == rightAnswerIndex) && (answered == true)){
		numCorrectAnswer++;
		$("#message").html("Correct");
	} else if((selectedAnswer != rightAnswerIndex) && (answered == true)){
		numIncorrectAnswer++;
		$("#message").html("Wrong");
		$("#actualAnswer").html("The correct answer was: " + rightAnswerText);
	} else{
		numNotAnswered++;
		$("#message").html("Out of Time");
		$("#actualAnswer").html("The correct answer was: " + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (lolQuestions.length-1)){
		setTimeout(finalResult, 2000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 2000);
	}	
}

function finalResult(){
	$("#timer").empty();
	$("#message").empty();
	$("#actualAnswer").empty();
	$("#result").html("Result");
	$("#numCorrectAnswers").html("Correct Answers: " + numCorrectAnswer);
	$("#numIncorrectAnswers").html("Incorrect Answers: " + numIncorrectAnswer);
	$("#numNotAnswered").html("Not answered: " + numNotAnswered);
	$("#playAgain").addClass("reset");
	$("#playAgain").show();
	$("#playAgain").html("Play Again");
}

$("#playAgain").on("click", function(){
	$(this).hide();
	play();
});