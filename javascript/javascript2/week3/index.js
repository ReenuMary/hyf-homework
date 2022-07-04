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
