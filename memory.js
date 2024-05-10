document.addEventListener("DOMContentLoaded", () => {
  // Array of colors, each color appears twice
  const colors = [
    "red", "blue", "green", "yellow", "purple",
    "red", "blue", "green", "yellow", "purple"
  ];

  // Get the game board element
  const gameBoard = document.getElementById("game-board");

  // Variables to track the game state
  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard, secondCard;

  // Function to shuffle the colors array
  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

  // Shuffle the colors
  shuffle(colors);

  // Create card elements and add them to the game board
  colors.forEach(color => {
    // Create card container
    const card = document.createElement("div");
    card.className = "card";

    // Create front face of the card
    const front = document.createElement("div");
    front.className = "front";

    // Create back face of the card
    const back = document.createElement("div");
    back.className = "back";
    back.style.backgroundColor = color;

    // Append front and back faces to the card
    card.appendChild(front);
    card.appendChild(back);

    // Append card to the game board
    gameBoard.appendChild(card);

    // Add click event listener to the card
    card.addEventListener("click", flipCard);
  });

  // Function to handle card flip
  function flipCard() {
    // If the board is locked or the same card is clicked twice, do nothing
    if (lockBoard || this === firstCard) return;

    // Add the 'flipped' class to show the card's back face
    this.classList.add("flipped");

    // Check if it is the first or second card being flipped
    if (!hasFlippedCard) {
      // If it is the first card
      hasFlippedCard = true;
      firstCard = this;
    } else {
      // If it is the second card
      secondCard = this;

      // Check if the two flipped cards match
      checkForMatch();
    }
  }

  // Function to check if two flipped cards match
  function checkForMatch() {
    // Compare the background color of the back faces
    if (firstCard.children[1].style.backgroundColor === secondCard.children[1].style.backgroundColor) {
      // If they match, disable the cards
      disableCards();
    } else {
      // If they do not match, unflip the cards after a delay
      unflipCards();
    }
  }

  // Function to disable matched cards
  function disableCards() {
    // Add 'matched' class to both cards
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    // Remove the click event listener to prevent further clicks
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    // Reset the board state
    resetBoard();
  }

  // Function to unflip unmatched cards
  function unflipCards() {
    // Lock the board to prevent further clicks
    lockBoard = true;

    // Remove the 'flipped' class after a delay
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");

      // Reset the board state
      resetBoard();
    }, 1000);
  }

  // Function to reset the board state
  function resetBoard() {
    // Reset tracking variables
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }
});
