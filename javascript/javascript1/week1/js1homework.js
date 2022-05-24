//Excercise1
const yearOfBirth = 1980;
const futureYear = 2025;
const userName = "Reenu";
const currentAge = new Date().getFullYear() - yearOfBirth;
const futureAge = futureYear - yearOfBirth;

console.log(`${userName} is ${currentAge} years old now.`);
console.log(`She will be ${futureAge} years old in ${futureYear}`);

//Excercise2
//"1 dog year = 7 human years"

const dogYearOfBirth = 2015;
const dogYearFuture = 2025;
const shouldShowResultInDogYears = true;
const dogAgeInFuture = dogYearFuture - dogYearOfBirth;
if (shouldShowResultInDogYears) {
  console.log(
    `Your dog will be ${dogAgeInFuture * 7} dog years old in ${dogYearFuture}`
  );
} else {
  console.log(
    `Your dog will be ${dogAgeInFuture} human years old in ${dogYearFuture}`
  );
}

//Excercise 3
//housePrice = volumeInMeters * 2.5 * 1000 + gardenSizeInM2 * 300;
const houseVolume = [8 * 10 * 10, 5 * 11 * 8];
const gardenSize = [100, 70];
const actualPricePaid = [2500000, 1000000];
const calculatedPrice = [
  houseVolume[0] * 2.5 * 1000 + gardenSize[0] * 300,
  houseVolume[1] * 2.5 * 1000 + gardenSize[1] * 300,
];
console.log(`Calculated volume for Peter's house  ${houseVolume[0]}`);
console.log(`Calculated price for Peter's house ${calculatedPrice[0]}`);
console.log(`Actual price paid for Peter's house ${actualPricePaid[0]}`);
if (calculatedPrice[0] > actualPricePaid[0]) {
  console.log(
    `Peter paid 
       ${calculatedHousePrice[0] - actualPricePaid[0]}
        less than the calculated price. `
  );
} else if (calculatedPrice[0] === actualPricePaid[0]) {
  console.log(
    `Peter paid ${actualPricePaidPeter}. Same as the calculated price`
  );
} else {
  console.log(
    `Peter paid ${
      actualPricePaid[0] - calculatedPrice[0]
    } more than the calculated price.`
  );
}

console.log(`Calculated volume for Julia's house  ${houseVolume[1]}`);
console.log(`Calculated price for Julia's house ${calculatedPrice[1]}`);
console.log(`Actual price paid for Julia's house ${actualPricePaid[1]}`);

if (calculatedPrice[1] > actualPricePaid[1]) {
  console.log(
    `Julia paid ${
      calculatedPrice[1] - actualPricePaid[1]
    } less than the calculated price.`
  );
} else if (calculatedPrice[1] === actualPricePaid[1]) {
  console.log(
    `Julia paid ${actualPricePaidPeter}. Same as the calculated price`
  );
} else {
  console.log(
    `Julia paid   
      ${actualPricePaid[0] - calculatedPrice[0]} more than
       the calculated price. `
  );
}

//Excercise 4
const firstWords = [
  "Easy",
  "Bright",
  "Awsome",
  "First",
  "Fancy",
  "Purple",
  "Rainbow",
  "Crayons",
  "One",
  "Xtreme",
];
const secondWords = [
  "Solutions",
  "Corporation",
  "Society",
  "Limitted",
  "Company",
  "For You",
  "Technologies",
  "Machiens",
  "Services",
  "Gateway",
];

const randomNumber1 = Math.floor(Math.random() * 10);
const randomNumber2 = Math.floor(Math.random() * 10);

console.log(
  `Startup name ${firstWords[randomNumber1]} ${secondWords[randomNumber2]}`
);
