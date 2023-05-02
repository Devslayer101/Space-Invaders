//imports
const themeMusic = new Audio('music/theme.wav');
themeMusic.volume = 0.5;
const menuMusic = new Audio('music/menu1.wav');
menuMusic.volume = 0.5;

function gameMusic(MusicId = 0){
    if(MusicId === 0){
        menuMusic.play();
    }
    if(MusicId === 1){
        themeMusic.play();
    }
    menuMusic.addEventListener("ended", function(){
        setTimeout(function(){menuMusic.currentTime = 0;
            menuMusic.play();
        }, 5000);
        
    })
}