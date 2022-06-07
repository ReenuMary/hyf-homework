const names = [
  "Peter",
  "Ahmad",
  "Yana",
  "kristina",
  "Rasmus",
  "Samuel",
  "katrine",
  "Tala",
];
const nameToRemove = "Ahmad";

// Write some code here
function removeNameFromArray(name) {
  if (arguments.length < 1 || typeof name != "string") {
    console.log("Please provide the name to remove as a string");
    return;
  }
  //the check is not necessary but just additional info for the user if required
  if (names.indexOf(name) === -1) {
    console.log(`${name} is not present in the array`);
    return;
  }
  names.splice(names.indexOf(name), 1);
}
removeNameFromArray();
removeNameFromArray("5");
removeNameFromArray(nameToRemove);
// Code done

console.log(names); // ['Peter', 'Yana', 'kristina', 'Rasmus', 'Samuel', 'katrine', 'Tala']

//Ex 2
const travelInformation = {
  speed: 50,
  destinationDistance: 432,
};

function getTravelTime(travelInformation) {
  if (
    arguments.length < 1 ||
    !travelInformation.hasOwnProperty("destinationDistance") ||
    !travelInformation.hasOwnProperty("speed")
  ) {
    return "Invalid travel information";
  }
  if (
    typeof travelInformation.destinationDistance != "number" ||
    typeof travelInformation.speed != "number"
  ) {
    return "Destination distance and speed must be numbers";
  }
  const time = travelInformation.destinationDistance / travelInformation.speed;
  const hours = Math.floor(time);
  const minutes = Math.floor((time % 1) * 60);
  return `${hours} hours and ${minutes} minutes`;
}
console.log(getTravelTime());
console.log(getTravelTime(2));
console.log(getTravelTime({ destinationDistance: 100, speed: "25 " }));

const travelTime = getTravelTime(travelInformation);
console.log(travelTime); // 8 hours and 38 minutes
