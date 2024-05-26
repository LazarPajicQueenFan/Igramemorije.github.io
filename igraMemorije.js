
var item = document.getElementsByClassName("item");
var flippedCards = [];
var niz = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
var matches = 0;
var timer = 30;
var gameActive = true;
var flip = document.getElementById("flip");

function play_audio(element) {
    var audio = document.createElement("audio");
    audio.src = element.src; // Assuming the "flip" element has a valid src attribute
    audio.addEventListener("ended", function () {
        if(this.parentNode)
        this.parentNode.removeChild(this);
    }, false);
    audio.play();   
}

function setCookie(name, value) {
    document.cookie = name + "=" + value + "; path=/";
}

function updateCookieValue(name, newValue) {
    var existingValue = getCookie(name);
    var updatedValue = existingValue ? existingValue + ',' + newValue : newValue;
    setCookie(name, updatedValue);
}


function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

var isFirstVisit = getCookie('firstVisit') === null;

if (isFirstVisit) {
    // Set the first visit cookie
    setCookie('firstVisit', 'false');
}

var wins = isFirstVisit ? 0 : parseInt(getCookie('wins')) || 0;
var losses = isFirstVisit ? 0 : parseInt(getCookie('losses')) || 0;

function randomise(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

randomise(niz);

function Timer() {
    if (!gameActive) {
        return;
    }

    setTimeout(Timer, 1000);
    if (timer > 0 && matches < 8) {
        timer--;
        document.querySelector("#timer").innerHTML = timer;
    }
    
    else if (timer > 0 && matches === 8) {
        audio = document.getElementById("win");
        audio.play();
        document.querySelector("#timer").innerHTML = "Pobeda";
        document.getElementById("timer").style.backgroundColor = "blue";
        document.getElementById("body").style.backgroundColor = "green";
        document.getElementById("gameOver").style.display = "block";
        document.querySelector("#refresh").style.display = "inline-block";
        document.querySelector("#drugo").style.display = "inline-block";
        document.getElementById("gameOver").style.backgroundColor = "green";
        wins++;
        setCookie('wins', wins);
        console.log("Broj pobeda: " + wins);
        document.getElementById("wins").innerHTML = "Broj pobeda: " + wins;
        document.getElementById("losses").innerHTML = "Broj poraza: " + losses;
        updateWinPercentage();
        gameActive = false;

    } 
    
    else if (timer === 0 && matches < 8) {
        audio = document.getElementById("loss");
        audio.play();
        document.querySelector("#timer").innerHTML = "Poraz";
        document.getElementById("timer").style.backgroundColor = "blue";
        document.getElementById("body").style.backgroundColor = "red";
        document.getElementById("gameOver").style.display = "block";
        document.querySelector("#refresh").style.display = "inline-block";
        document.querySelector("#drugo").style.display = "inline-block";
        document.getElementById("gameOver").style.backgroundColor = "rgb(237, 236, 232)";
        losses++;
        setCookie('losses', losses);
        console.log("Broj poraza: " + losses);
        document.getElementById("wins").innerHTML = "Broj pobeda: " + wins;
        document.getElementById("losses").innerHTML = "Broj poraza: " + losses;
        updateWinPercentage();
        gameActive = false;
    }
}

function updateWinPercentage() {
    var percent = wins + losses;
    var winPercentage = percent === 0 ? 0 : parseInt((wins / percent) * 100);
    document.getElementById("percentage").innerHTML = "Procenat pobede: " + winPercentage + "%";
}
Timer();

for (var i = 0; i < item.length; i++) {
    (function work(index) {
        item[index].addEventListener("click", function () {
           
            play_audio(flip);

            if (!gameActive || flippedCards.length >= 2 || this.classList.contains('flipped')) {
                return;
            }
            var image = this.querySelector('img');
            image.src = "image_" + niz[index] + ".png"; // Set the image source based on niz[index]
            this.classList.add('flipped'); // Apply a class for flipped state
            flippedCards.push({ element: this, value: niz[index], image: image });

            if (flippedCards.length === 2) {
                if (flippedCards[0].value === flippedCards[1].value) {
                    matches++;
                    setTimeout(function () {
                        flippedCards = [];
                    }, 700);
                } else {
                    setTimeout(function () {
                        flippedCards.forEach(function (card) {
                            card.image.src = "questionmark108.png";
                            card.element.classList.remove('flipped'); // Remove flipped class
                        });
                        flippedCards = [];
                    }, 700);
                }
            }
        });
    })(i);
}
