function deathLook(sprite, times = 20){
    for(let i = 0; i < times; i++){
        sprite.style.opacity = 0.4;
        setTimeout(sprite.style.opacity = 1, 2000);
    }
}