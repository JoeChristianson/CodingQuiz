var mainSection = document.querySelector("main")
var startQuizButton = document.querySelector("#start-quiz-btn")
var timeSpan = document.querySelector("#time-span");
var timeLeft = 100;
var questionIndex = 0;
var questions = [];
var points = 0;
var countdown;

class Question{
    constructor(index,question,correctAnswer,otherAnswers){
        this.index = index;
        this.question = question;
        this.correctAnswer = correctAnswer;
        this.otherAnswers = otherAnswers;
        this.options = randomizeAnswers(correctAnswer,otherAnswers);
        this.correctIndex = this.options.indexOf(correctAnswer);
        questions.push(this)
    }
}

var question1 = new Question(0,"Which is not a semantic element?","<div>",["<header>","<article>","<figure>"])
var question2 = new Question(1,"Who is the president?","Joe Biden",["Donald Trump","Barack Obama","George Bush"])


function startQuiz(){
    console.log("started quiz!")
    startTimer()
    mainSection.innerHTML = "";
    var question = document.createElement("h2");
    mainSection.append(question);
    for(let i=0;i<4;i++){
        var answer = document.createElement("button");
        answer.dataset.option = i;
        mainSection.append(answer);
    }
    var footer = document.createElement("footer");
    mainSection.append(footer)
    footer.textContent = "Here is where the footer info goes!"
    setQuestionValues(questions[0]);
}

function startTimer(){
    countdown = setInterval(function(){
        if(timeLeft===0){
            clearInterval(countdown)
            endQuiz()
        }
        else {
            timeLeft--;
            timeSpan.textContent = timeLeft;
        }
    },1000)
}

function endQuiz(){
    clearInterval(countdown);
    mainSection.innerHTML = "";
    var el0 = document.createElement("h3");
    el0.textContent = "You scored "+points+" Points!"
    mainSection.append(el0)
    var el1 = document.createElement("h3");
    el1.textContent = "Enter three letters for your initials.";
    mainSection.append(el1)
    var input = document.createElement("input");
    mainSection.append(input);
    var submit = document.createElement("button")
    mainSection.append(submit);
    submit.textContent = "SUBMIT"
    submit.addEventListener("click",()=>{
        var initials = input.value;
        if (initials.length !== 3){
            console.log("invalid entry")
            return
        }
        else{
            var newScore = {
                initials:initials,
                score:points,
            }
            var highScores = JSON.parse(localStorage.getItem("highScores"));
            highScores.push(newScore);
            localStorage.setItem("highScores",JSON.stringify(highScores));
            promptPlayAgain();
        }
    })
    

}

function setQuestionValues(question){
    if (question === undefined){
        endQuiz()
        return;
    }

    document.querySelector("h2").textContent = question.question;
    for(var i = 0;i<question.options.length;i++){
        var button = document.querySelector(`[data-option="${i}"`);
        button.textContent = question.options[i];
        button.className = "option";
    }
}

function randomizeAnswers(correctAnswer,otherAnswers){
    var options = [...otherAnswers];
    options.splice(Math.floor(Math.random()*4),0,correctAnswer);
    return options;    
}

startQuizButton.addEventListener("click",startQuiz)

mainSection.addEventListener("click",function(event){
    var el = event.target;
    if (!el.matches(".option")){
        console.log("Not a button");
        return;
    }
    // Not strict equality as option is a string
    else if (el.dataset.option == questions[questionIndex].correctIndex){
        console.log("Correct");
        answerCorrect()
    }
    else if (el.dataset.option != questions[questionIndex].correctIndex){
        console.log("Incorrect");
        answerWrong();
    }
    questionIndex++;
    setQuestionValues(questions[questionIndex]);
})

function answerWrong(){
    document.querySelector("footer").textContent = "WRONG!";
    setTimeout(()=>{
        document.querySelector("footer").textContent = "";
    },3000)
    timeLeft -=10;
}

function answerCorrect(){
    document.querySelector("footer").textContent = "CORRECT!";
    setTimeout(()=>{
        document.querySelector("footer").textContent = "";
    },3000)
    points++;
}

function promptPlayAgain(){
    console.log("Play Again?")
}