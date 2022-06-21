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

//Find and count the Danish letters
function getWordAnddanishLetterCount(danishString) {
  if (arguments.length < 1 || typeof danishString != "string") {
    return "Invalid argument";
  }

  const object = { total: 0 };
  const aeCount = (danishString.match(/æ/gi) || []).length;
  const åCount = (danishString.match(/å/gi) || []).length;
  const øCount = (danishString.match(/ø/gi) || []).length;

  if (aeCount > 0) {
    object["æ"] = aeCount;
  }
  if (åCount > 0) {
    object["å"] = åCount;
  }
  if (øCount > 0) {
    object["ø"] = øCount;
  }
  object.total = aeCount + åCount + øCount;
  return object;
}
const danishString = "Jeg har en blå bil";
console.log(getWordAnddanishLetterCount(danishString));
const danishString2 = "Blå grød med røde bær";
console.log(getWordAnddanishLetterCount(danishString2));
