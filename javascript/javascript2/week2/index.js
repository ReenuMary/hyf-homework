//doubling of odd numbers
let numbers = [1, 2, 3, 4, 5, 6, 7];
let newNumbers = numbers.filter((x) => x % 2 != 0).map((x) => x * 2);
console.log(`The doubled numbers are  ${newNumbers}`);

//Working with movies
//1.Movies with short title  -> title with 1 or 2 words
