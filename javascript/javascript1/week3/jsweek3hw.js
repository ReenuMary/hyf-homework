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
