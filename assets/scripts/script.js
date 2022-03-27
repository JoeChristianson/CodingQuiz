var body = document.querySelector("body")
var mainSection = document.querySelector("main")
var startQuizButton = document.querySelector("#start-quiz-btn")
var timeSpan = document.querySelector("#time-span");
var timeLeft;
var questionIndex;
var questions = [];
var points = 0;
var countdown;
class Question{
    constructor(question,correctAnswer,otherAnswers){
        this.index = questions.length;
        this.question = question;
        this.correctAnswer = correctAnswer;
        this.otherAnswers = otherAnswers;
        this.options = randomizeAnswers(correctAnswer,otherAnswers);
        this.correctIndex = this.options.indexOf(correctAnswer);
        questions.push(this)
    }
}
new Question("Which is not a semantic element?","<div>",["<header>","<article>","<figure>"])
new Question("Which element in an html document includes the javascript?","<script>",["<javascript>","<java>","<link>"])
new Question("The method 'querySelectorAll' returns what type of value when invoked?","Array",["Number","Object","HTML Element"])
new Question("What is localStorage a property of in the DOM?","window",["document","system","it is not a property"])
new Question("Which is not a type of pop-up box?","input",["alert","confirm","prompt"])
new Question("Which kind of loop can iterate through the properties of an object?","for...in",["for...of","for...each","forEach"])
new Question("What tests for loose equality?","==",["===","~=","=~"]);
new Question("How many arguments does Math.random() require?",0,[2,1,"random is not a method of the Math Object"])
new Question("Which is not a pseudo element?","None of the options are.",["hover","touch","within"])
new Question("What is the value of 19%9?",1,[2,10,"NaN"])
function startQuiz(){
    points = 0;
    questionIndex = 0;
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
    body.append(footer)
    setQuestionValues(questions[0]);
}
function startTimer(){
    timeLeft = 1000;
    countdown = setInterval(function(){
        if(timeLeft<=0){
            clearInterval(countdown)
            timeSpan.textContent = "OUT OF TIME"
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
            return
        }
        else{
            var newScore = {
                initials:initials,
                score:points,
            }
        var highScores = JSON.parse(localStorage.getItem("highScores"));
        if (!highScores) highScores = [];
        highScores.push(newScore)
        localStorage.setItem("highScores",JSON.stringify(highScores));

            promptPlayAgain();
        }
    })
}
function setQuestionValues(question){
    if (!question){
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
        return;
    }
    else if (el.dataset.option == questions[questionIndex].correctIndex){
        answerCorrect()
    }
    else if (el.dataset.option != questions[questionIndex].correctIndex){
        answerWrong();
    }
    questionIndex++;
    setQuestionValues(questions[questionIndex]);
})
function answerWrong(){
    document.querySelector("footer").innerHTML = "<hr><p>Incorrect!</p>";
        setTimeout(()=>{
        document.querySelector("footer").textContent = "";
    },3000)
    timeLeft -=10;
}
function answerCorrect(){
    document.querySelector("footer").innerHTML = "<hr><p>Correct!</p>";
    setTimeout(()=>{
        document.querySelector("footer").textContent = "";
    },3000)
    points++;
}
function promptPlayAgain(){
    mainSection.innerHTML = ""
    var el = document.createElement("button");
    mainSection.append(el)
    el.textContent = "Play Again?";
    el.id = "play-again-btn";
    el.addEventListener("click",()=>{
        startQuiz();
    })
    timeSpan.textContent = 75;
}