const products = getAvailableProducts();
console.log(products);
const rowsPerPage = 5;
let currentPage = 1;

let filterResultsFlag = false;
let filterResults = [];

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

function applyFilterButtonClick() {
  const maxPrice = parseFloat(document.getElementById("max-price").value);
  const minPrice = parseFloat(document.getElementById("min-price").value);

  const filter = {};
  if (!isNaN(maxPrice)) filter.maxPrice = maxPrice;
  if (!isNaN(minPrice)) filter.minPrice = minPrice;
  const filteredProducts = filterAndSortProducts(products, filter);
  displayFilterResultsWithPagination(filteredProducts);
}

function clearFilterButtonClick() {
  document.getElementById("max-price").value = "";
  document.getElementById("min-price").value = "";
  displayFilterResultsWithPagination(products);
}

function filterAndSortProducts(products, filter) {
  for (const key in filter) {
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

  const sortCriteria = document.getElementById("sort-by-name").checked
    ? "name"
    : document.getElementById("sort-by-price").checked
    ? "price"
    : "rating";
  return sortProducts(products, sortCriteria);
}

function searchTextKeyUp() {
  const searchKeyWord = document.getElementById("search").value;
  const regEx = new RegExp(`^${searchKeyWord}`, "i");

  const maxPrice = parseFloat(document.getElementById("search-price").value);
  const filter = {};
  if (!isNaN(maxPrice)) {
    filter.maxPrice = maxPrice;
  }

  if (searchKeyWord !== "") {
    const regEx = new RegExp(`^${searchKeyWord}`, "i");
    filter.search = regEx;
  }
  const filteredProducts = filterAndSortProducts(products, filter);
  displayFilterResultsWithPagination(filteredProducts);
}

function displayFilterResultsWithPagination(filteredProducts) {
  filterResultsFlag = true;
  displayPaginationButtons(filteredProducts.length);
  currentPage = 1;
  renderProductsByPage(filteredProducts, currentPage);

  if (products.length === filteredProducts.length) {
    filterResultsFlag = false;
    filterResults = [];
  } else {
    filterResults = filteredProducts;
  }
}

function searchPriceKeyUp() {
  const searchKeyWord = document.getElementById("search").value;
  const filter = {};
  if (searchKeyWord !== "") {
    const regEx = new RegExp(`^${searchKeyWord}`, "i");
    filter.search = regEx;
  }

  const maxPrice = parseFloat(document.getElementById("search-price").value);

  if (!isNaN(maxPrice)) {
    filter.maxPrice = maxPrice;
  }
  const filteredProducts = filterAndSortProducts(products, filter);
  filterResultsFlag = true;
  displayPaginationButtons(filteredProducts.length);
  currentPage = 1;
  renderProductsByPage(filteredProducts, currentPage);

  if (products.length === filteredProducts.length) {
    filterResultsFlag = false;
    filterResults = [];
  } else {
    filterResults = filteredProducts;
  }
}

function sortProducts(products, sortCriteria) {
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
  const sortedProducts = [];
  if (filterResultsFlag) {
    sortedProducts = sortProducts(filterResults, "name");
  } else {
    sortedProducts = sortProducts(products, "name");
  }
  currentPage = 1;
  renderProductsByPage(sortedProducts, currentPage);
}

function sortByPriceClicked() {
  let sortedProducts = [];
  if (filterResultsFlag) {
    sortedProducts = sortProducts(filterResults, "price");
  } else {
    sortedProducts = sortProducts(products, "price");
  }

  currentPage = 1;
  renderProductsByPage(sortedProducts, currentPage);
}

function sortByRatingClicked() {
  let sortedProducts = [];
  if (filterResultsFlag) {
    sortedProducts = sortProducts(filterResults, "rating");
  } else {
    sortedProducts = sortProducts(products, "rating");
  }
  currentPage = 1;
  renderProductsByPage(sortedProducts, currentPage);
}

function renderProductsByPage(products, pageNumber) {
  const ulElement = document.getElementById("products");
  ulElement.innerHTML = "";
  const startIndex = (pageNumber - 1) * rowsPerPage;
  const endIndex =
    startIndex + rowsPerPage - 1 > products.length
      ? products.length - 1
      : startIndex + rowsPerPage - 1;
  const productsCopy = [...products];
  const productToDisplay = productsCopy.splice(startIndex, rowsPerPage);

  for (const product of productToDisplay) {
    ulElement.appendChild(
      createLiWithProperties(product.name, product.price, product.rating)
    );
  }
  document.getElementById("list-count").innerHTML = `Displaying ${
    startIndex + 1 > products.length ? startIndex : startIndex + 1
  } to ${endIndex + 1 > products.length ? endIndex : endIndex + 1} of ${
    products.length
  } products. `;
}

function displayPaginationButtons(countOfProducts) {
  const noOfPages = Math.ceil(countOfProducts / rowsPerPage);
  const paginationUlElement = document.getElementById("pagination-buttons");
  paginationUlElement.innerHTML = "";
  for (let i = 0; i < noOfPages; i++) {
    const liBtn = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerHTML = i + 1;
    btn.addEventListener("click", pagingButtonClicked);
    liBtn.appendChild(btn);
    paginationUlElement.appendChild(liBtn);
  }
}

function pagingButtonClicked(e) {
  currentPage = parseInt(e.currentTarget.innerHTML);
  if (currentPage !== undefined && !isNaN(currentPage)) {
    filterResultsFlag
      ? renderProductsByPage(filterResults, currentPage)
      : renderProductsByPage(products, currentPage);
  } else {
    console.warn("error in getting page number");
  }
}
displayPaginationButtons(products.length);
renderProductsByPage(sortProducts(products, "name"), currentPage);
