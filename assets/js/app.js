var deck = document.querySelector('.deck');
var cardInPlay = document.querySelector('.play');
var computerHand = [];
var playerHand = [];
var cardsInPlay = [];
var computerJackDelay;

function gameHasEnded() {
  return playerHand.length == 52 || computerHand.length == 52;
}

    // player plays cards
function playerPlay() {
  var nextCard = playerHand.pop();
  cardsInPlay.push(nextCard);
  if(nextCard !== undefined) {
      cardInPlay.src = "img/cards/2x/" + nextCard + ".png";
  }
  // remove event listener after player has played
  deck.removeEventListener('click', playerPlay);
  // computer's turn
  if (!nextCard.includes("_jack")) {
    computerPlay();
  } else {
    jackPlaced();
  }
}
    // computer plays cards
function computerPlay() {
  setTimeout(function() {
    // computer plays
    var nextCard = computerHand.pop();
    cardsInPlay.push(nextCard);
    if(nextCard !== undefined) {
      cardInPlay.src = "img/cards/2x/" + nextCard + ".png";
    }
    if (nextCard.includes("_jack")) {
      jackPlaced();
    }

    if(!gameHasEnded()) {
      deck.addEventListener('click', playerPlay);
    }
  }, 1000);
}

// after random delay, computer will attempt to slap the jack
function jackPlaced() {
  // 600ms to 1600ms
  var delay = Math.floor((Math.random() * 1000) + 600);
  computerJackDelay = setTimeout(function() {
    console.log('computer got it!');
    computerHand = computerHand.concat(cardsInPlay);
    cardsInPlay = [];
    cardInPlay.src = "img/cards/2x/back-black.png";
  }, delay);
}

cardInPlay.addEventListener('click', function(e) {
  var src = e.target.src;
  if (src.includes("_jack") && !gameHasEnded()) {
    // testing purposes, remove later
    console.log("player got it!");
    clearInterval(computerJackDelay);
    playerHand = playerHand.concat(cardsInPlay);
    cardsInPlay = [];
    cardInPlay.src = "img/cards/2x/back-black.png";
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

} // game end

game();
