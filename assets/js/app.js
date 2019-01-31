var deckOfCards = [];
var deck = document.querySelector('.deck');
var cardInPlay = document.querySelector('.play');

deck.addEventListener('click', function(e) {
  var nextCard = deckOfCards.pop();
  if(nextCard !== undefined) {
    cardInPlay.src = "img/cards/2x/" + nextCard + ".png";
  }
});

cardInPlay.addEventListener('click', function(e) {
  var src = e.target.src;
  alert('You clicked on a card in play. It\'s file is ' + src);
});

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
var cardsArr = ["club_jack", "club_queen", "club_king", "diamond_jack", "diamond_queen", "diamond_king", "heart_jack", "heart_queen", "heart_king", "spade_jack", "spade_queen", "spade_king"];
for (i=1; i<=10; i++) {
  cardsArr.push("club_" + i);
  cardsArr.push("diamond_" + i);
  cardsArr.push("heart_" + i);
  cardsArr.push("spade_" + i);
}
deckOfCards = shuffle(cardsArr);
var computerArray = []
  for (i=0; i<26; i++) {
    computerArray.push(cardsArr[i])
  }
console.log(computerArray);

if (cardInPlay = ["club_jack, diamond_jack, heart_jack, spade_jack"]) {
} else {
  continue;
}
