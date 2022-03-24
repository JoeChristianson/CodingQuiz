var mainSection = document.querySelector("main")
var startQuizButton = document.querySelector("#start-quiz-btn")
var timeSpan = document.querySelector("#time-span");
var timeLeft = 10;

function startQuiz(){
    console.log("started quiz!")
    startTimer()
    mainSection.innerHTML = ""
}

function startTimer(){
    var countdown = setInterval(function(){
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
    console.log("Time is Up!")
}

startQuizButton.addEventListener("click",startQuiz)