import { GoalModal } from "./modal.js";

const gameBorad = document.getElementById("gameBorad");
let cardList = GoalModal();

const numCards = 8;
const win = numCards * 2;
let delay = 1000;

// Genrate card

const cardGenerate = () => {
  cardList.sort(() => Math.random() - 0.5);
  cardList = cardList.slice(0, numCards);
  cardList = cardList.concat(cardList);
  cardList.sort(() => Math.random() - 0.5);

  console.log(cardList);
  // Html
  cardList.forEach((item) => {
    const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("img");

    card.classList.add("card");
    face.classList.add("face");
    back.classList.add("back");
    // Giver card info med billeder
    card.setAttribute("name", item.name);
    face.src = item.imgSrc;
    back.src = "/assets/images/FN-Verdensmaal-ikon-logo.png";

    // lægger cards sammen med gameBorad
    gameBorad.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    card.addEventListener("click", (tog) => {
      card.classList.toggle("toggleCard");
      checkCards(tog);
    });
  });
};

// checker om at cards macher

const checkCards = (tog) => {
  console.log(tog);
  const toggleCard = document.querySelectorAll(".toggleCard");
  const clickedCard = tog.target;
  clickedCard.classList.add("flipped");
  const flippedCards = document.querySelectorAll(".flipped");
  // if section

  if (flippedCards.length === 2) {
    if (
      flippedCards[0].getAttribute("name") ===
      flippedCards[1].getAttribute("name")
    ) {
      console.log("match");
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        card.style.pointerEvents = "none";
      });
    } else {
      console.log("wrong");
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        setTimeout(() => card.classList.remove("toggleCard"), delay);
      });
    }
  }
  setInterval(() => {
    if (toggleCard.length == win) {
      alert("Congratulations! You won :)");
    }
  }, delay);
};

// reset

// Timer

const startTimer = (duration, display) => {
  let timer = duration;

  const updateTimer = () => {
    const minutes = String(Math.floor(timer / 60)).padStart(2, "0");
    const seconds = String(timer % 60).padStart(2, "0");

    display.textContent = `${minutes}:${seconds}`;

    if (timer === 0) {
      clearInterval(timerInterval);
      alert("Time is up! You lost :(");
      
    }

    timer--;
  };

 
  updateTimer();
  const timerInterval = setInterval(updateTimer, 1000);
};

window.onload = () => {
  const timeDown = 60; 
  const display = document.getElementById("timeLeft");
  startTimer(timeDown, display);
};


cardGenerate();
