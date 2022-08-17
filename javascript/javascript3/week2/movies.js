function getBadMovies(movieJson) {
  const badMovies = movieJson.filter(
    (movie) => movie.votes < 20000 && movie.rating < 6
  );
  return badMovies;
}

function getMoviesAfterYear(movieJson, year) {
  return movieJson.filter((movie) => movie.year > year);
}

function getMovies() {
  fetch(
    "https://gist.githubusercontent.com/pankaj28843/08f397fcea7c760a99206bcb0ae8d0a4/raw/02d8bc9ec9a73e463b13c44df77a87255def5ab9/movies.json"
  )
    .then((response) => response.json())
    .then((responseObj) => {
      console.log(responseObj);
      console.log("BAD MOVIES: \n", getBadMovies(responseObj));
      console.log(
        "Movies After 2000 : \n",
        getMoviesAfterYear(responseObj, 2000)
      );
    });
}
getMovies();

function getPromise(resolveAfter) {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Resolved after delay"), resolveAfter * 1000);
  });
}

getPromise(8).then((result) => console.log(result));

async function usePromiseAsync() {
  const result = await getPromise(5);
  console.log(result);
}

usePromiseAsync();

function setTimeoutPromise(delay) {
  return new Promise((resolve) => setTimeout(() => resolve(), delay));
}
setTimeoutPromise(3000).then(() => {
  console.log("Called after 3 seconds");
});

function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((p) => resolve(p));
  });
}

getCurrentLocation()
  .then((position) => {
    console.log(position);
  })
  .catch((error) => {
    console.log(error);
  });

//Fetching and waiting

getPromise(3)
  .then(() => console.log("Starting api call after 3 sec"))
  .then(() =>
    fetch(
      "https://gist.githubusercontent.com/pankaj28843/08f397fcea7c760a99206bcb0ae8d0a4/raw/02d8bc9ec9a73e463b13c44df77a87255def5ab9/movies.json"
    )
  )
  .then((response) => response.json())
  .then((responseObj) => console.log(responseObj));

//Fetching and waiting using async await
async function stepByStepAsync() {
  const step1 = await getPromise(3);
  console.log("Starting api call after 3 sec");

  const step2 = await fetch(
    "https://gist.githubusercontent.com/pankaj28843/08f397fcea7c760a99206bcb0ae8d0a4/raw/02d8bc9ec9a73e463b13c44df77a87255def5ab9/movies.json"
  );
  const step2Json = await step2.json();

  console.log(step2Json);
}
stepByStepAsync();
