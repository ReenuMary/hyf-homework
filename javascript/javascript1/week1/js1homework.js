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

function HousePrice(houseDimension, gardenSize, actualPricePaid, userName) {
  this.houseDimension = houseDimension;
  this.gardenSize = gardenSize;
  this.actualPricePaid = actualPricePaid;
  this.houseVolume = houseDimension[0] * houseDimension[1] * houseDimension[2];
  this.housePrice = this.houseVolume * 2.5 * 1000 + this.gardenSize * 300;
  this.differenceInPrice = this.actualPricePaid - this.housePrice;
  this.userName = userName;
  this.analysePrice = function () {
    if (this.differenceInPrice > 0) {
      console.log(
        `${this.userName} paid ${this.differenceInPrice} more than the calculated price which is ${this.housePrice}`
      );
    } else if (this.differenceInPrice === 0) {
      console.log(
        `${this.userName} paid the same price as the calculated price`
      );
    } else {
      console.log(
        `${this.userName} paid ${
          this.differenceInPrice * -1
        } less than the calculated price  which is ${this.housePrice}`
      );
    }
  };
}

const housePricePeter = new HousePrice([8, 10, 10], 100, 2500000, "Peter");
housePricePeter.analysePrice();
const housePriceJulia = new HousePrice([5, 11, 8], 70, 1000000, "Julia");
housePriceJulia.analysePrice();
//console.log(housePricePeter);

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
