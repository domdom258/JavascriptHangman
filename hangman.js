var hangManList = ['thrall', 'jaina', 'garrosh', 'medivh', 'khadgar']; //  list of words
var guess;
var blankWord;
var numOfWrongGuesses = 0;
var drawArray = [];
var wordGenerated = hangManList[Math.floor((Math.random() * hangManList.length))];
var wordGeneratedArray = wordGenerated.split('');
var canvas = document.getElementById("hangManCanvas");
var context = canvas.getContext("2d");
var gameWin = true;

//blankWord = wordGenerated.replace(/[a-z]/g ,'_ ');

for (var i = 0; i < wordGeneratedArray.length; i++) {
    wordGeneratedArray[i] = "_ ";

}
function generateWord() { //generate the word from array


    for (var i = 0; i < wordGeneratedArray.length; i++) {
        var word = document.getElementById('hangManWord');
        var createLetter = document.createTextNode(wordGeneratedArray[i]);
        word.appendChild(createLetter);
    }
}

function solveWord() {
    guessedLetter = guess;
    wordToSolve = wordGenerated;
    var wrongLetterField = document.getElementById('wrongLetters');
    var wrongLetter;

    for (var i = 0; i < wordGeneratedArray.length; i++) {
        if (!wordGeneratedArray.includes('_ ')) {
            checkIfWin();
        } else {
            if (guessedLetter === wordToSolve.charAt(i)) {
                wordGeneratedArray[i] = guessedLetter + ' ';
                var hit = true;
            }
        }
    }

    var word = document.getElementById('hangManWord');
    word.innerHTML = '';
    generateWord();

    if (!hit) {
        numOfWrongGuesses++;
        /*wrongLetter = document.createTextNode(guessedLetter);
        wrongLetterField.appendChild(wrongLetter);*/
        //call draw function and draws whatever piece is depending on gueses
        drawHangMan(numOfWrongGuesses);

        if (numOfWrongGuesses === 6) {
            end();
        }
    }
}

function checkIfWin() {
    for (var i = 0; i < wordGeneratedArray.length; i++) {
        if (wordGeneratedArray[i] === '_ ') {
            gameWin = false;
        }
    }
    if (gameWin); {
        end();
    }
}


function hangManFrame() {
    context.strokeStyle = " #fffef9";
    context.lineWidth = 3;
    context.beginPath();
    context.moveTo(50, 100);
    context.lineTo(250, 100);
    context.moveTo(250, 100);
    context.lineTo(250, 150);
    context.moveTo(75, 100);
    context.lineTo(75, 350);
    context.stroke();
}

function drawHangMan(wrongGuesses) {
    context.lineWidth = 2;
    context.beginPath();
    context.strokeStyle = " #fffef9";
    if (wrongGuesses === 1) {
        context.arc(250, 175, 25, 0, 2 * Math.PI, false);
    }
    else if (wrongGuesses === 2) {
        context.moveTo(250, 200);
        context.lineTo(250, 300);
    }
    else if (wrongGuesses === 3) {
        context.moveTo(250, 225);
        context.lineTo(200, 250);
    }
    else if (wrongGuesses === 4) {
        context.moveTo(250, 225);
        context.lineTo(300, 250);
    }
    else if (wrongGuesses === 5) {
        context.moveTo(250, 300);
        context.lineTo(200, 350);
    }
    else if (wrongGuesses === 6) {
        context.moveTo(250, 300);
        context.lineTo(300, 350);
    }
    context.stroke();
}

function end() {
    var modal = document.getElementById('endScreenModal');
    var span = document.getElementsByClassName("close")[0];

    if (numOfWrongGuesses === 6 || gameWin) {
        modal.style.display = "block";
        span.onclick = function () {
            modal.style.display = "none";
        }
    }
}

function eventListener() {

    var buttons = document.getElementsByTagName('button');
    for (var i = 0; i < buttons.length; i++) {
        guess = buttons[i].addEventListener('click', function (e) {
            guess = this.id;
            console.log(guess);
            solveWord();
            document.getElementById(this.id).disabled = true;
        }, false)
    }
}

eventListener();

window.onload = start;

function start() {
    generateWord();
    hangManFrame();
}




