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

//5. movies rated higher than 6. Now map the movies array to only the rating of the movies.

const highRatingMovies = movies
  .filter((oneMovie) => oneMovie.rating > 6)
  .map((x) => x.rating);
console.log(highRatingMovies);
