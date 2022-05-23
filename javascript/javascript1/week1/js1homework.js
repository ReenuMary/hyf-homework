//Excercise1
const yearOfBirth = 1980;
const futureYear = 2025;
const userName = "Reenu";
const currentAge = new Date().getFullYear() - yearOfBirth;
const futureAge = futureYear - yearOfBirth;

console.log(userName + " is " + currentAge + " years old now.");
console.log("She will be " + futureAge + " years old in " + futureYear);

//Excercise2
//"1 dog year = 7 human years"

const dogYearOfBirth = 2015;
const dogYearFuture = 2025;
let shouldShowResultInDogYears = true;
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
const houseDimensionPeter = [8, 10, 10];
const houseVolumePeter =
  houseDimensionPeter[0] * houseDimensionPeter[1] * houseDimensionPeter[2];
const gardenSizePeter = 100;
const calculatedHousePricePeter =
  houseVolumePeter * 2.5 * 1000 + gardenSizePeter * 300;
const actualPricePaidPeter = 2500000;

console.log("Calculated volume for Peter's house " + houseVolumePeter);
console.log("Calculated price for Peter's house " + calculatedHousePricePeter);
console.log("Actual price paid for Peter's house " + actualPricePaidPeter);

if (calculatedHousePricePeter > actualPricePaidPeter) {
  console.log(
    `Peter paid 
      ${calculatedHousePricePeter - actualPricePaidPeter}
       less than the calculated price. `
  );
} else if (calculatedHousePricePeter == actualPricePaidPeter) {
  console.log(
    `Peter paid ${actualPricePaidPeter}. Same as the calculated price`
  );
} else {
  console.log(
    `Peter paid   
      ${actualPricePaidPeter - calculatedHousePricePeter} more than
      the calculated price. `
  );
}
const houseDimensionJulia = [5, 11, 8];
const houseVolumeJulia =
  houseDimensionJulia[0] * houseDimensionJulia[1] * houseDimensionJulia[2];
const gardenSizeJulia = 70;
const calculatedHousePriceJulia =
  houseVolumeJulia * 2.5 * 1000 + gardenSizeJulia * 300;
const actualPricePaidJulia = 1000000;

console.log("Calculated volume for Julia's house " + houseVolumeJulia);
console.log("Calculated price for Julia's house " + calculatedHousePriceJulia);
console.log("Actual price paid for Julia's house " + actualPricePaidJulia);

if (calculatedHousePriceJulia > actualPricePaidJulia) {
  console.log(
    `Julia paid 
      ${calculatedHousePriceJulia - actualPricePaidJulia}
       less than the calculated price. `
  );
} else if (calculatedHousePriceJulia == actualPricePaidJulia) {
  console.log(
    `Julia paid ${actualPricePaidJulia}. Same as the calculated price`
  );
} else {
  console.log(
    `Julia paid   
      ${actualPricePaidJulia - calculatedHousePriceJulia} more than
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

const randomNumber = Math.floor(Math.random() * 10);

console.log(
  `Startup name ${firstWords[randomNumber]} ${secondWords[randomNumber]}`
);
