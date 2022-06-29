const products = getAvailableProducts();
console.log(products);

function createLiWithProperties(name, price, rating) {
  const liElement = document.createElement("li");
  const pName = document.createElement("p");
  pName.innerHTML = name;
  const pPrice = document.createElement("p");
  pPrice.innerHTML = `Price : ${price}`;
  const pRating = document.createElement("p");
  pRating.innerHTML = `Rating: ${rating}`;

  liElement.appendChild(pName);
  liElement.appendChild(pPrice);
  liElement.appendChild(pRating);
  return liElement;
}
function renderProducts(products) {
  const ulElement = document.getElementById("products");
  ulElement.innerHTML = "";
  for (const product of products) {
    ulElement.appendChild(
      createLiWithProperties(product.name, product.price, product.rating)
    );
  }
  document.getElementById(
    "list-count"
  ).innerHTML = `Total ${products.length} products listed`;
}

function applyFilterButtonClick() {
  const maxPrice = parseFloat(document.getElementById("max-price").value);
  const minPrice = parseFloat(document.getElementById("min-price").value);

  const filter = {};
  if (!isNaN(maxPrice)) filter.maxPrice = maxPrice;
  if (!isNaN(minPrice)) filter.minPrice = minPrice;
  const filteredProducts = filterProducts(products, filter);
  renderProducts(filteredProducts);
}

function clearFilterButtonClick() {
  document.getElementById("max-price").value = "";
  document.getElementById("min-price").value = "";
  renderProducts(products);
}

function filterProducts(products, filter) {
  for (let key in filter) {
    switch (key) {
      case "maxPrice": {
        products = products.filter(
          (oneProduct) => oneProduct.price <= filter.maxPrice
        );
        break;
      }
      case "minPrice": {
        products = products.filter(
          (oneProduct) => oneProduct.price >= filter.minPrice
        );
        break;
      }
      case "search": {
        products = products.filter((oneProduct) =>
          oneProduct.name.match(filter.search)
        );
        break;
      }
    }
  }
  return products;
}

function searchTextKeyUp() {
  const searchKeyWord = document.getElementById("search").value;
  //const copyProducts = getCopyOfProducts();
  const regEx = new RegExp(`^${searchKeyWord}`, "i");
  const filter = { search: regEx };
  const filteredProducts = filterProducts(products, filter);
  renderProducts(filteredProducts);
}

function sortProducts(products, sortCriteria) {
  //
  switch (sortCriteria) {
    case "name": {
      products.sort((a, b) =>
        a.name
          .toUpperCase()
          .localeCompare(b.name.toUpperCase(), "en", { sensitivity: "base" })
      );
      break;
    }
    default: {
      products.sort(
        (product1, product2) => product1[sortCriteria] - product2[sortCriteria]
      );
      break;
    }
  }

  return products;
}
function sortByNameClicked() {
  const sortedProducts = sortProducts(products, "name");
  renderProducts(sortedProducts);
}
function sortByPriceClicked() {
  const sortedProducts = sortProducts(products, "price");
  renderProducts(sortedProducts);
}

function sortByRatingClicked() {
  const sortedProducts = sortProducts(products, "rating");
  renderProducts(sortedProducts);
}

renderProducts(sortProducts(products, "name"));
