console.log("Script loaded");

const products = getAvailableProducts();
console.log(products);

function renderProducts(products) {
  const ulElement = document.getElementById("products");
  for (const product of products) {
    ulElement.appendChild(createLiElementWithText(product.name));
    ulElement.appendChild(createLiElementWithText(`Price : ${product.price}`));
    ulElement.appendChild(createLiElementWithText(`Rating: ${product.rating}`));
  }
}

function createLiElementWithText(text) {
  const liElement = document.createElement("li");
  liElement.innerHTML = text;
  return liElement;
}
renderProducts(products);
