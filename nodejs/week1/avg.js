const numbers = process.argv.slice(2);
let sum = 0,
  count = 0;
for (let i = 0; i < numbers.length; i++) {
  const parsedValue = parseFloat(numbers[i]);
  if (!isNaN(parsedValue)) {
    sum += parsedValue;
    ++count;
  }
}
count > 0
  ? console.log(`Average of given numbers is ${sum / count}`)
  : console.log(`No valid numbers entered`);
