function btnGifClick() {
  const searchKeyWord = document.getElementById("search-text").value;
  let noOfGifs = document.getElementById("gif-count").value;
  if (
    noOfGifs === "" ||
    noOfGifs === null ||
    noOfGifs === undefined ||
    isNaN(noOfGifs)
  )
    noOfGifs = 5;
  const url = new URL("https://api.giphy.com/v1/gifs/search");
  const params = {
    q: searchKeyWord,
    limit: noOfGifs,
    api_key: "pLg6OqlnCUK2JBmKNqWDJfHaFViJFvQ8",
  };

  Object.keys(params).forEach((key) => {
    url.searchParams.append(key, params[key]);
  });

  fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      displaySearchResult(responseJson);
    });
}

function displaySearchResult(gifJson) {
  const ulElement = document.getElementById("gif-ul");
  gifJson.data.forEach((oneGifElement) => {
    const liElement = document.createElement("li");
    liElement.innerHTML = `<img src=${oneGifElement.url}/>`;
    ulElement.appendChild(liElement);
  });
}
document.getElementById("btn-gif").addEventListener("click", btnGifClick);
