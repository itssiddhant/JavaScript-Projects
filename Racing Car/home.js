const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');

startScreen.addEventListener('click', start);

let player = {speed :5,score:0};
let keys = { ArrowUp: false, w :false, s: false, a: false, d: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);


function keyDown(e) {
    // console.log(e.key);
    e.preventDefault();
    keys[e.key] = true;
}
function keyUp(e) {
    e.preventDefault();
    keys[e.key] = false;
}
function collision(a,b){
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();
    
    return !((aRect.top>bRect.bottom) ||(aRect.bottom<bRect.top) || (aRect.right<bRect.left) || (aRect.left>bRect.right)) ;
}
function moveLines(){
    let lines = document.querySelectorAll('.lines');

    lines.forEach(function(value){

        if(value.y >=635){
            value.y -=740;
        }
        value.y += player.speed;
        value.style.top = value.y + "px";

    })
}
function endGame(){
    player.start = false;
    startScreen.classList.remove('hide');
    
}
function moveEnemy(car){
    let eCars = document.querySelectorAll('.enemy');

    eCars.forEach(function(value){
        if(collision(car,value)){
            endGame();
        };
        if(value.y >=655){
            value.y =-300;
            value.style.left = Math.floor(Math.random()*350) + "px";
        }
        value.y += player.speed;
        value.style.top = value.y + "px";

    })
}
function playGame() {
    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();
    // console.log(road);
    if (player.start) {
        moveLines();
        moveEnemy(car);
        if((keys.ArrowUp || keys.w)&&(player.y>road.top+100)){
            player.y -=player.speed;
        }
        if((keys.ArrowDown || keys.s)&&(player.y<road.bottom-90)){
            player.y +=player.speed;
        }
        if((keys.ArrowLeft || keys.a)&&(player.x>10)){
            player.x -=player.speed;
        }
        if((keys.ArrowRight || keys.d)&&(player.x<road.width-60)){
            player.x +=player.speed;
        }

        car.style.top = player.y + "px";
        car.style.left = player.x + "px";


        window.requestAnimationFrame(playGame);

        player.score++;
        score.innerText = "Score: "+player.score;
        startScreen.innerHTML = "Game Over :( <br> Your Final Score is "+ player.score + "<br>Click Here to Play Again!"
    }
}
function start() {

    startScreen.classList.add('hide');
    score.classList.remove('hide');
    gameArea.innerHTML ="";
    
    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(playGame);

    for(x=0; x<5;x++){
        let roadLine = document.createElement('div');
        roadLine.setAttribute('class','lines');
        roadLine.y = (x*150);
        roadLine.style.top = roadLine.y +"px";
        gameArea.appendChild(roadLine);
    }

    let car = document.createElement('div');
    car.setAttribute('class','car');

    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    for(x=0; x<4;x++){
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class','enemy');
        enemyCar.y = ((x+1)*350)*-1;
        enemyCar.style.top = enemyCar.y +"px";
        enemyCar.style.backgroundColor = 'transparent';
        enemyCar.style.left = Math.floor(Math.random()*350) + "px";
        gameArea.appendChild(enemyCar);
    }
}