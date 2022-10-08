/* <li class="grid">
            <input type="checkbox" />
            <p>Item nmae</p>
            <p>5000</p>
          </li> */
function renderProducts(productList) {
  const ulElement = document.getElementById("product-list");
  ulElement.innerHTML = "";
  productList.forEach((oneProduct) => {
    const liElement = document.createElement("li");
    liElement.classList.add("grid");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    liElement.appendChild(checkbox);
    const pElementProduct = document.createElement("p");
    pElementProduct.innerHTML = oneProduct.name;
    const pElementPrice = document.createElement("p");
    pElementPrice.innerHTML = oneProduct.price;
    liElement.append(checkbox, pElementProduct, pElementPrice);
    ulElement.appendChild(liElement);
  });
}

function addToCartButtonClick() {
  // alert("clicked");
  const ulElement = document.getElementById("product-list");
  const liElementList = ulElement.getElementsByTagName("li");
  console.log(liElementList);
  const shoppingCart = new ShoppingCart();
  for (let i = 0; i < liElementList.length; i++) {
    if (liElementList[i].children[0].checked) {
      //console.log(liElementList[i].children[1].innerText);
      const productName = liElementList[i].children[1].innerText;
      const productPrice = liElementList[i].children[2].innerText;
      shoppingCart.addProduct(new Product(productName, productPrice));
    }
  }
  localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
  const shoppingCart1 = JSON.parse(
    localStorage.getItem("shoppingCart") || "[]"
  );
  console.log(shoppingCart1);
}

document
  .getElementById("add-to-cart")
  .addEventListener("click", addToCartButtonClick);

const productList = [];
productList.push(new Product("flat-screen", 5000));
productList.push(new Product("iphone13", 10000));
productList.push(new Product("headphone", 200));
productList.push(new Product("pc", 6000));
productList.push(new Product("adapter", 200));
productList.push(new Product("mouse", 300));

renderProducts(productList);

//shoppingCart.addProduct(flatscreen);
//shoppingCart.addProduct(new Product("PC", 3000));
//console.log(shoppingCart.products);
