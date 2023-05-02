const cards = document.querySelectorAll(".card");
time = document.querySelector(".time b");
record = document.querySelector(".record b");
refreshButton = document.querySelector(".refresh");

let cardsMatched = 0;
let timeTaken = 0;
let recordTime = null;
let card1, card2, timer;
let disableDeck = false;
let firstMove = false;

function initTimer(){
  timeTaken++;
  time.innerText = timeTaken;
}

function flipCard({target: clickedCard}){
  if (!firstMove){
    firstMove = true;
    timer = setInterval(initTimer, 1000);
  }
  if (clickedCard !== card1 && !disableDeck){
    clickedCard.classList.add("flip");
    if (!card1){
      return card1 = clickedCard;
    }
    card2 = clickedCard;
    disableDeck = true;

    let card1Image = card1.querySelector("img").src,
    card2Image = card2.querySelector("img").src;
    matchCards(card1Image, card2Image);
  }
  
}

function matchCards(image1, image2){
  if(image1 === image2){
    cardsMatched++;

    if(cardsMatched == 8){
      if (recordTime == null || timeTaken < recordTime){
        recordTime = timeTaken;
        record.innerText = recordTime;
        clearInterval(timer);
      }

      setTimeout(() => {
        return shuffleCard();
      }, 2000);
    }
    card1.removeEventListener("click", flipCard);
    card2.removeEventListener("click", flipCard);
    card1 = card2 = "";
    return disableDeck = false;
  }
  
  setTimeout(() => {
    card1.classList.remove("flip");
    card2.classList.remove("flip");
    card1 = card2 = "";
    disableDeck = false;
  }, 500);
}

function shuffleCard(){
  cardsMatched = 0;
  timeTaken = 0;
  card1 = card2 = "";
  clearInterval(timer);
  disableDeck = false;
  firstMove = false;

  let cardsArr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  cardsArr.sort(() => Math.random() > 0.5 ? 1 : -1);

  cards.forEach((card, i) => {
    card.classList.remove("flip");
    let imageID = card.querySelector("img");
    imageID.src = `Cards/card-${cardsArr[i]}.png`;
    card.addEventListener("click", flipCard);
  });

  time.innerText = timeTaken;
}

shuffleCard();

refreshButton.addEventListener("click", shuffleCard);

cards.forEach(card => {
  card.addEventListener("click", flipCard);
});