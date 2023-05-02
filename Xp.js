const XPDiv = document.getElementById('xp');

let Xp = 0;

const XpDefault = 10;

function XpOnDeath(Multiplier = 1){
    if(Multiplier <= 3){
        Xp += XpDefault + parseInt(1.1 * Multiplier);
    }else{
        Xp += XpDefault * Multiplier;
    }
    XPDiv.innerHTML = "XP: " + Xp;
}

function HighScore(hello){
    score(Xp);
}