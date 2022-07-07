let isGameStarted, lCounter, sCounter, countDown, intervalId;
window.onload = function () {
  if (localStorage.getItem("hasCodeRunBefore") === null) {
    localStorage.setItem("hasCodeRunBefore", true);
    isGameStarted = false;
    lCounter = 0;
    sCounter = 0;
    countDown = 0;
  }
};

function renderConfetti(elementId) {
  var confettiElement = document.getElementById(elementId);
  var confettiSettings = { target: confettiElement };
  var confetti = new ConfettiGenerator(confettiSettings);
  confetti.render();
}

function endOfGame() {
  isGameStarted = false;
  clearInterval(intervalId);
  if (sCounter === 0 && lCounter === 0) {
    document.getElementById("s-message").innerHTML =
      "Click start and press 's' to play";
    document.getElementById("l-message").innerHTML =
      "Click start and press 'l' to play";
  } else {
    if (sCounter === lCounter) {
      document.getElementById("s-message").innerHTML = "Equal score";
      document.getElementById("l-message").innerHTML = "Equal score";
    } else {
      if (sCounter > lCounter) {
        document.getElementById("s-message").innerHTML = "You Won !!!";
        // renderConfetti("s-canvas");
      } else {
        document.getElementById("l-message").innerHTML = "You Won !!!";
        // renderConfetti("l-canvas");
      }
    }
  }
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

function timeLeftCounter() {
  --countDown;
  document.getElementById(
    "count-down"
  ).innerHTML = `Time left ${countDown} seconds.`;
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
    countDown = gameDurationSeconds - 1;

    document.getElementById("s-counter").innerHTML = sCounter;
    document.getElementById("l-counter").innerHTML = lCounter;
    document.getElementById("s-message").innerHTML = "";
    document.getElementById("l-message").innerHTML = "";
    document.getElementById(
      "count-down"
    ).innerHTML = `Time left ${gameDurationSeconds} seconds.`;

    setTimeout(endOfGame, gameDurationSeconds * 1000);
    intervalId = setInterval(timeLeftCounter, 1000);
  }
}

document
  .getElementById("btn-start-game")
  .addEventListener("click", btnStartGameClick);

document.addEventListener("keyup", keyPressed);
