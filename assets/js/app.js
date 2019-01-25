var deckOfDards = [];
var deck = document.querySelector('.deck');
var cardInPlay = document.querySelector('.play');


deck.addEventListener('click', function(e) {
  // e.target <-- thing you clicked on
  // e.target.className <-- class of the thing
  // e.target.style.display = "none" <-- hides the thing
  alert('You clicked on the deck');
});

cardInPlay.addEventListener('click', function(e) {
  var src = e.target.src;
  alert('You clicked on a card in play. It\'s file is ' + src);
});

function shuffle() {

}
