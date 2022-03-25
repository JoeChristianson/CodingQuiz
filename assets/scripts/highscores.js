// Need to Add Clear High Scores Button

var dummyHighScores = [{
    initials:"AAA",
    score: 0,
},
{
    initials:"BBB",
    score: 0,
},
{
    initials:"CCC",
    score: 0,
},
{
    initials:"DDD",
    score: 0,
},
{
    initials:"EEE",
    score: 0,
},
{
    initials:"FFF",
    score: 0,
},
{
    initials:"GGG",
    score: 0,
},
{
    initials:"HHH",
    score: 0,
},
{
    initials:"III",
    score: 0,
},
{
    initials:"JJJ",
    score: 0,
},
]

if(!localStorage.getItem("highScores")){
    localStorage.setItem("highScores",JSON.stringify(dummyHighScores));
}

// this sets the highScores variable to a parsed array sorted according to score of each object
var highScores = JSON.parse(localStorage.getItem("highScores")).sort((a,b)=>{
    return b.score - a.score
})

// this appends scores descending from highest with a max of ten scores appended.
for (let i=0;i<highScores.length && i<10;i++){
    var scoreRow = document.createElement("li");
    scoreRow.innerHTML = `<span>${highScores[i].initials}</span><span>${highScores[i].score}</span>`
    document.querySelector("#high-scores-list").append(scoreRow);
}