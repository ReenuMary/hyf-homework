//Warm up
function printMessageWithDelay(delay = 0, stringToLog = "") {
  if (typeof delay !== "number" || typeof stringToLog != "string") {
    console.log("invalid arguments passed to printMessageWithDelay");
    return;
  }
  setTimeout(() => {
    console.log(stringToLog);
  }, delay * 1000);
}
printMessageWithDelay(2, "Hello my friend");
function delayButtonClicked() {
  printMessageWithDelay(5, "Called after 5 seconds");
}
const btnDelayedMessage = document.getElementById("btn-delayed-message");
btnDelayedMessage.addEventListener("click", () =>
  printMessageWithDelay(5, "Called after 5 seconds")
);

const earthLogger = () => console.log("Earth");
const saturnLogger = () => console.log("Saturn");
const planetLogFunction = (functionName) => functionName();

planetLogFunction(earthLogger);
planetLogFunction(saturnLogger);

//LOG LOCATION
function getAndLogLocation() {
  //navigator.geolocation
  const statusText = document.querySelector("#status");
  if (!navigator.geolocation) {
    statusText.innerHTML = "Location not supported by browser";
  } else {
    statusText.innerHTML = "Loading location...";

    function locationSuccess(position) {
      document.getElementById(
        "lbl-latitude"
      ).innerHTML = `Latitude - ${position.coords.latitude}`;
      document.getElementById(
        "lbl-longitude"
      ).innerHTML = `Longitude - ${position.coords.longitude}`;
      statusText.innerHTML = "";

      window.initMap = initMap();
    }

    function locationError(errorMessage) {
      statusText.innerHTML = errorMessage;
    }

    const location = navigator.geolocation.getCurrentPosition(
      locationSuccess,
      locationError
    );
  }
}

const btnLocation = document.getElementById("btn-log-location");
btnLocation.addEventListener("click", getAndLogLocation);

let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}

function runAfterDelay(delay, callback) {
  setTimeout(callback, delay * 1000);
}

runAfterDelay(2, () => console.log("Running callback function after delay"));

document.addEventListener("mouseup", logDoubleClick);
let isfirstClick = false;
function logDoubleClick() {
  if (isfirstClick) console.log("double click");
  isfirstClick = true;
  setTimeout(() => (isfirstClick = false), 500);
}

const logFunnyJoke = () => console.log("Funny joke");
const logBadJoke = () => console.log("Bad joke");

const jokeCreator = (shouldTellFunnyJoke) =>
  shouldTellFunnyJoke ? logFunnyJoke() : logBadJoke();

jokeCreator(false);
