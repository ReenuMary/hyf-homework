let isGameStarted, lCounter, sCounter;
window.onload = function () {
  if (localStorage.getItem("hasCodeRunBefore") === null) {
    localStorage.setItem("hasCodeRunBefore", true);
    isGameStarted = false;
    lCounter = 0;
    sCounter = 0;
  }
};

function endOfGame() {
  // sCounter ===lCounter ?
  sCounter > lCounter
    ? (document.getElementById("s-counter").innerHTML = "You Won !!!")
    : (document.getElementById("l-counter").innerHTML = "You Won !!!");
}

function keyPressed(e) {
  if (isGameStarted) {
    if (e.key === "s") {
      ++sCounter;
      document.getElementById("s-counter").innerHTML = sCounter;
    } else if (e.key === "l") {
      ++lCounter;
      document.getElementById("l-counter").innerHTML = lCounter;
    }
  }
}

function btnStartGameClick() {
  const gameDurationSeconds = parseInt(
    document.getElementById("game-time").value
  );
  if (isNaN(gameDurationSeconds)) {
    document.getElementById(
      "error-msg"
    ).innerHTML = `Please enter game duration`;
  } else {
    document.getElementById("error-msg").innerHTML = "";
    isGameStarted = true;
    sCounter = 0;
    lCounter = 0;
    document.getElementById("s-counter").innerHTML = sCounter;
    document.getElementById("l-counter").innerHTML = lCounter;

    setTimeout(endOfGame, gameDurationSeconds * 1000);
  }
}

document
  .getElementById("btn-start-game")
  .addEventListener("click", btnStartGameClick);

document.addEventListener("keyup", keyPressed);
