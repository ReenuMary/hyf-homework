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
