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
      displayOSMap(position.coords.latitude, position.coords.longitude);
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

function displayOSMap(latitude, longitude) {
  let mapOptions = {
    center: [latitude, longitude],
    zoom: 10,
  };

  let map = new L.map("map", mapOptions);

  let layer = new L.TileLayer(
    "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  );
  map.addLayer(layer);

  let marker = new L.Marker([latitude, longitude]);
  marker.addTo(map);
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

// Function as a variable
const functionNameArray = [fnA, fnB, fnC];
function fnA() {
  console.log("fnA called");
}

function fnB() {
  console.log("fnB called");
}

function fnC() {
  console.log("fnC called");
}

function callAllFunctions(functionNameArray) {
  functionNameArray.forEach((element) => element());
}

callAllFunctions(functionNameArray);

const myFunctionVariable = () => console.log("Function called using variable");
myFunctionVariable();

const fnFromObject = () => {
  console.log("Function invoked from object key");
};

const object = { fnName: fnFromObject };
object.fnName();
