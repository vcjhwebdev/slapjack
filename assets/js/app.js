var deck = document.querySelector('.deck');
var cardInPlay = document.querySelector('.play');
var computerHand = [];
var playerHand = [];
var cardsInPlay = [];
var computerJackDelay;
var playerCanPlay = false;

function gameHasEnded() {
  return playerHand.length == 52 || computerHand.length == 52;
}

function placeModal(content) {
  var body = document.querySelector("body");
  var modal = document.createElement("div");
  modal.className = "modal";
  var modalContent = content;
  modal.innerHTML = modalContent;
  // add event listener to close modal
  var button = modal.querySelector("button");
  button.addEventListener("click", function() {
    body.removeChild(modal);
    if(gameHasEnded()) {
      game();
      cardInPlay.src= "img/cards/2x/back-black.png";
    }
  });
  // place modal on the page
  body.insertBefore(modal, body.children[0]);
  playerCanPlay = true;
}
// player plays cards
function playerPlay() {
  if(playerCanPlay) {
    var nextCard = playerHand.pop();
    cardsInPlay.push(nextCard);
    if(nextCard !== undefined) {
        cardInPlay.src = "img/cards/2x/" + nextCard + ".png";
    } else {
      placeModal(`
      <div class="modal-content">
        <h1>The computer won!</h1>
        <button class="button" onclick="window.location.reload()">Restart Game</button>
      </div>`);
    }
    playerCanPlay = false;
    // computer's turn
    if (!nextCard.includes("_jack")) {
      computerPlay();
    } else {
      jackPlaced();
    }
  }
}
// computer plays cards
function computerPlay() {
  var delay = Math.floor((Math.random() * 1000) + 600);
  setTimeout(function() {
    // computer plays
    var nextCard = computerHand.pop();
    cardsInPlay.push(nextCard);
    if(nextCard !== undefined) {
      cardInPlay.src = "img/cards/2x/" + nextCard + ".png";
    } else {
      placeModal(`
      <div class="modal-content">
        <h1>You won!</h1>
        <button class="button" onclick="window.location.reload()">Restart Game</button>
      </div>`);
    }
    if (nextCard.includes("_jack")) {
      jackPlaced();
    }

    if(!gameHasEnded()) {
      playerCanPlay = true;
    }
  }, delay);
}

// after random delay, computer will attempt to slap the jack
function jackPlaced() {
  deck.removeEventListener('click', playerPlay);
  //remove deck event listener so player cannot click
  var delay = Math.floor((Math.random() * 1000) + 600);
  // 600ms to 1600ms
  computerJackDelay = setTimeout(function() {
    computerHand = cardsInPlay.concat(computerHand);
    cardsInPlay = [];
    cardInPlay.src = "img/cards/2x/back-black.png";
    placeModal(`
    <div class="modal-content">
      <h1>The computer got the slap!</h1>
      <p>Your cards: ${playerHand.length}</p>
      <p>Computer cards: ${computerHand.length}</p>
      <button class="button">Continue</button>
    </div>`);
  }, delay);
  // add deck event listener so player can click again
  deck.addEventListener('click', playerPlay);
}

cardInPlay.addEventListener('click', function(e) {
  var src = e.target.src;
  if (src.includes("_jack") && !gameHasEnded()) {
    clearInterval(computerJackDelay);
    playerHand = cardsInPlay.concat(playerHand);
    cardsInPlay = [];
    cardInPlay.src = "img/cards/2x/back-black.png";
    placeModal(`
    <div class="modal-content">
      <h1>You got the slap!</h1>
      <p>Your cards: ${playerHand.length}</p>
      <p>Computer cards: ${computerHand.length}</p>
      <button class="button">Continue</button>
    </div>`);
  }
});


// shuffle and deal
function shuffle() {

  var allPossibleCards = ["club_jack", "club_queen", "club_king", "diamond_jack", "diamond_queen", "diamond_king", "heart_jack", "heart_queen", "heart_king", "spade_jack", "spade_queen", "spade_king"];
  for (i=1; i<=10; i++) {
    allPossibleCards.push("club_" + i);
    allPossibleCards.push("diamond_" + i);
    allPossibleCards.push("heart_" + i);
    allPossibleCards.push("spade_" + i);
  }

  function deal(deck) {
    // deal the cards
      for (i=0; i<26; i++) {
        computerHand.push(deck.pop());
      }

    var playerArray = []
      for (i=0; i<26; i++) {
        playerHand.push(deck.pop());
      }
  }

  var currentIndex = allPossibleCards.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = allPossibleCards[currentIndex];
    allPossibleCards[currentIndex] = allPossibleCards[randomIndex];
    allPossibleCards[randomIndex] = temporaryValue;
  }

  deal(allPossibleCards);
}

function game() {
  shuffle();
  // loop
  // add click event listener so player can begin
  deck.addEventListener('click', playerPlay);
  playerCanPlay = true;
}


game();
