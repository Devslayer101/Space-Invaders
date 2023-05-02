const XpDiv = document.getElementById('Xp');

function score(XP){
    clearXp();
    localStorage.setItem("XP", JSON.stringify(XP));  
    console.log(XP);
}

function clearXp(){
    localStorage.removeItem("XP");
}

function loadXp(){
    highXp = localStorage.getItem("XP");
    XpDiv.innerHTML = "Last XP Score: " + highXp;
}