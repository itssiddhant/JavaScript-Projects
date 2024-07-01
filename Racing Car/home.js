const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');

startScreen.addEventListener('click', start);

let player = {speed :5};
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
function playGame() {
    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();
    console.log(road);
    if (player.start) {
        if((keys.ArrowUp || keys.w)&&(player.y>road.top+100)){
            player.y -=player.speed;
        }
        if((keys.ArrowDown || keys.s)&&(player.y<road.bottom-80)){
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
    }
}
function start() {
    gameArea.classList.remove('hide');
    startScreen.classList.add('hide');
    
    player.start = true;
    window.requestAnimationFrame(playGame);

    for(x=0; x<5;x++){
        let roadLine = document.createElement('div');
        roadLine.setAttribute('class','lines');
        roadLine.style.top = (x*150)+"px";
        gameArea.appendChild(roadLine);
    }

    let car = document.createElement('div');
    car.setAttribute('class','car');

    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;
}