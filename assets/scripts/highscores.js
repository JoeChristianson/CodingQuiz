var dummyHighScores = [{
    initials:"BOB",
    score: 30,
},
{
    initials:"JJA",
    score: 26,
},
{
    initials:"POB",
    score: 50,
},
{
    initials:"AAA",
    score: 23,
},
]

localStorage.setItem("highScores",JSON.stringify(dummyHighScores));

// this sets the highScores variable to a parsed array sorted according to score of each object
var highScores = JSON.parse(localStorage.getItem("highScores")).sort((a,b)=>{
    return b.score - a.score
})

// this appends scores descending from highest with a max of ten scores appended.
for (let i=0;i<highScores.length && i<10;i++){
    var scoreRow = document.createElement("li");
    scoreRow.textContent = highScores[i].initials + ": " + highScores[i].score;
    document.querySelector("#high-scores-list").append(scoreRow);
}