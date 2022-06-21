//find the shortest word
const danishWords = ["bil", "plante", "kaffe", "bog", "ø", "planetarium"];
console.log(getShortestWord(danishWords));
function getShortestWord(danishWords) {
  if (
    arguments.length < 1 ||
    !Array.isArray(danishWords) ||
    danishWords.length === 0
  ) {
    return "Please provide an array with strings";
  }
  // not checking if all elements are string
  let shortestWord = danishWords[0];
  danishWords.reduce((previous, current) => {
    if (current.length < shortestWord.length) shortestWord = current;
  });
  return shortestWord;
}
