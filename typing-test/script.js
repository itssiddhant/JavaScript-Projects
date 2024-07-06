const setWords = ["The quick brown fox jumps over the lazy dog.", "She sells seashells by the seashore on sunny days.", "A watched pot never boils, so be patient and wait.", "The cat sat on the mat and stared at the bright moon.", "Every cloud has a silver lining, even on stormy days.", "The early bird catches the worm, so rise and shine.", "An apple a day keeps the doctor away, or so they say.", "The pen is mightier than the sword in many battles.", "A journey of a thousand miles begins with a single step.", "Laughter is the best medicine for a happy and healthy life.", "Practice makes perfect, so keep trying and never give up.", "Beauty is in the eye of the beholder, and everyone sees differently.", "The grass is always greener on the other side of the fence.", "Actions speak louder than words, so show your true intentions.", "A picture is worth a thousand words, capturing moments forever."];
const msg = document.getElementById('msg');
const words = document.getElementById('input');
const btn = document.getElementById('btn');

let startTime, endTime;

const playGame = () => {
    let random = Math.floor(Math.random() * setWords.length);
    msg.innerText = setWords[random];
    let date = new Date();
    startTime = date.getTime();
    btn.innerHTML = "Finish";
    words.value ="";
    words.focus();
}

const count = (str) => {
    let response = str.split(" ").filter(word => word != "").length;
    return response;
}
const endPlay = () => {
    let date = new Date();
    endTime = date.getTime();
    let totalTime = ((endTime - startTime) / 1000);

    let totalStr = words.value.trim();
    let wordCount = count(totalStr);
    let speed = 0;
    if (wordCount>0){
        speed = Math.round((wordCount / totalTime) * 60);
    }
    let finalMsg = "You typed a total of " + wordCount + " words at a speed of " + speed + " words per minute. \n";
    finalMsg += compareWords(msg.innerText, totalStr);

    msg.innerText = finalMsg;

    wordCount=0;
}

const compareWords = (str1, str2) => {
    let words1 = str1.split(" ");
    let words2 = str2.split(" ");
    let count = 0;

    words1.forEach(function (item, index) {
        if (item == words2[index]) count++;
    })

    let errorWords = (words1.length - count);
    return (count + " are correct out of " + words1.length + " words and the total number of the errors are " + errorWords + " .");
}
btn.addEventListener('click', function () {
    if (this.innerText == 'Start') {
        words.disabled = false;
        playGame();
    }
    else if (this.innerText == 'Finish') {
        words.disabled = true;
        btn.innerText = "Start";
        endPlay();
    }
})
