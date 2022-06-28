const products = getAvailableProducts();
function createLiElementWithText(text) {
  const liElement = document.createElement("li");
  liElement.innerHTML = text;
  return liElement;
}

function renderProducts(products) {
  const ulElement = document.getElementById("products");
  ulElement.innerHTML = "";
  for (const product of products) {
    ulElement.appendChild(createLiElementWithText(product.name));
    ulElement.appendChild(createLiElementWithText(`Price : ${product.price}`));
    ulElement.appendChild(createLiElementWithText(`Rating: ${product.rating}`));
  }
}

function applyFilterButtonClick() {
  const maxPrice = parseFloat(document.getElementById("max-price").value);
  const minPrice = parseFloat(document.getElementById("min-price").value);

  const filter = {};
  if (!isNaN(maxPrice)) filter.maxPrice = maxPrice;
  if (!isNaN(minPrice)) filter.minPrice = minPrice;

  const copyProducts = [...products];

  const filteredProducts = filterProducts(copyProducts, filter);
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
    }
  }
  return products;
}

renderProducts(products);
