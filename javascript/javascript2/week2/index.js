//doubling of odd numbers
let numbers = [1, 2, 3, 4, 5, 6, 7];
let newNumbers = numbers.filter((x) => x % 2 != 0).map((x) => x * 2);
console.log(`The doubled numbers are  ${newNumbers}`);

//Working with movies

//1.Movies with short title  -> title with 1 or 2 words
const shortTitleMovies = movies.filter(
  (oneMovie) => oneMovie.title.split(" ").length <= 2
);
/* console.log("SHORT TITLE MOVIES");
console.log(shortTitleMovies);*/

//2.Create an array of movie titles with long movie titles!!  long title --> 3 or more words
const longTitleMovies = movies
  .filter((oneMovie) => oneMovie.title.split(" ").length >= 3)
  .map((x) => x.title);
/* console.log("TITLES OF LONG TITLE MOVIES");
console.log(longTitleMovies);
 */

//3. movies made between 1980-1989
const moviesIn80s = movies.filter(
  (oneMovie) => oneMovie.year >= 1980 && oneMovie.year <= 1989
);
const countMoviesIn80s = moviesIn80s.length;
/* console.log(moviesIn80s);
console.log(`count of movies in 80s - ${moviesIn80s.length}`); */

//4.Rating tag   Good (>= 7), Average (>= 4 and < 7), Bad (< 4)
const moviesRatingTag = movies.map((oneMovie) => {
  let rating =
    oneMovie.rating >= 7
      ? "Good"
      : oneMovie.rating >= 4 && oneMovie.rating < 7
      ? "Average"
      : "Bad";
  oneMovie.tag = rating;
  return oneMovie;
});
//console.log(moviesRatingTag);
//count of tags
let countGoodMovies = 0;
let countAverageMovies = 0;
let countBadMovies = 0;
/* moviesRatingTag.forEach((oneMovie) => {
  if (oneMovie.tag === "Good") ++countGoodMovies;
  else if (oneMovie.tag === "Average") ++countAverageMovies;
  else ++countBadMovies;
});
 */

moviesRatingTag.reduce((previous, current) => {
  if (current.tag === "Good") ++countGoodMovies;
  else if (current.tag === "Average") ++countAverageMovies;
  else ++countBadMovies;
}, movies[0]);
const movieCount = {
  goodMovies: countGoodMovies,
  badMovies: countBadMovies,
  averageMovies: countAverageMovies,
};
console.log(movieCount);
//5. movies rated higher than 6. Now map the movies array to only the rating of the movies.

const highRatingMovies = movies
  .filter((oneMovie) => oneMovie.rating > 6)
  .map((x) => x.rating);
//console.log(highRatingMovies);

//keywords: Surfer, Alien or Benjamin
const regExp = new RegExp("Surfer|Benjamin|Alien", "gi");
const moviesWithKeyWords = movies
  .filter((oneMovie) => oneMovie.title.match(regExp))
  .map((x) => x.title);
//console.log(moviesWithKeyWords);

//6.duplicate words in title
const duplicateWordMovies = movies.filter((oneMovie) => {
  const titleWords = oneMovie.title.split(" ");
  if (
    titleWords.filter((oneWord, index) => titleWords.indexOf(oneWord) !== index)
      .length != 0
  )
    return oneMovie;
});
console.log(duplicateWordMovies);

//7. average rating
let sumRatings = 0;
movies.reduce((previous, current) => {
  sumRatings += current.rating;
}, movies[0]);
//console.log(`Average rating is ${sumRatings / movies.length}`);
