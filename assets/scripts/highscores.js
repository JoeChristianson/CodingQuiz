var clearScoresBtn = document.querySelector("#clear-scores-btn")
var list = document.querySelector("#high-scores-list");

if(!localStorage.getItem("highScoresJIC55407")){
    localStorage.setItem("highScoresJIC55407",JSON.stringify([]));
}

// this sets the highScores variable to a parsed array sorted according to score of each object
var highScores = JSON.parse(localStorage.getItem("highScoresJIC55407")).sort((a,b)=>{
    return b.score - a.score
})
renderScores()
// this appends scores descending from highest with a max of ten scores appended.
function renderScores(){
    for (let i=0;i<highScores.length && i<10;i++){
        var scoreRow = document.createElement("li");
        scoreRow.innerHTML = `<span>${highScores[i].initials.toUpperCase()}</span><span>${highScores[i].score}</span>`
        list.append(scoreRow);
    }
}

// clears scores from js,local storage and unrenders them
clearScoresBtn.addEventListener("click",()=>{
    localStorage.removeItem("highScoresJIC55407");
    list.innerHTML = ""
    highScores=[];
    renderScores();
})