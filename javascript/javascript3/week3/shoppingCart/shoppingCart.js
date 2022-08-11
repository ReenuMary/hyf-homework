class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price; //price in DKK
  }
  convertToCurrency(currency) {
    let priceInCurrency = 0;
    switch (currency) {
      case "DKK": {
        priceInCurrency = this.price;
        break;
      }
      case "USD": {
        priceInCurrency = Math.round(this.price * 0.14 * 100) / 100;
        break;
      }
      case "GBP": {
        priceInCurrency = Math.round(this.price * 0.11 * 100) / 100;
        break;
      }
    }
    return priceInCurrency;
  }
}

class User {
  constructor(id, name) {
    this.id = id;
    this.userName = name;
  }
}

class ShoppingCart {
  constructor() {
    this.products = [];
  }

  addProduct(product) {
    if (product instanceof Product) {
      this.products.push(product);
    } else {
      console.warn(
        `${product} is not of type Product. So cannot add to shopping cart`
      );
    }
  }

  removeProduct(product) {
    let searchResultIndex = -1;
    if (product instanceof Product) {
      this.products.forEach((oneProduct, index) => {
        if (
          oneProduct.name === product.name &&
          oneProduct.price === product.price
        ) {
          searchResultIndex = index;
        }
      });

      if (searchResultIndex !== -1) {
        this.products.splice(searchResultIndex, 1);
        console.log(`${JSON.stringify(product)} removed from shopping cart`);
      } else {
        console.log(`${JSON.stringify(product)} not found in shopping cart`);
      }
    } else {
      console.warn(
        `${product} is not of type Product. So cannot remove from shopping cart`
      );
    }
  }

  searchProduct(productName) {
    const searchResult = this.products.filter(
      (product) => product.name === productName
    );
    if (searchResult.length === 0) {
      console.log(`${productName} not found in the shopping cart`);
    } else {
      console.log(`${JSON.stringify(searchResult)} found `);
    }
  }

  getTotal() {
    const total = this.products.reduce(
      (prevVal, currentVal) => prevVal + currentVal.price,
      0
    );
    console.log(`Total price is ${total}`);
    return total;
  }

  async renderProducts() {
    const ulElement = document.getElementById("cart-items");
    ulElement.innerHTML = "";
    const currentCurrency = document.getElementById("currency").value;

    this.products.forEach((oneProduct) => {
      const liElement = document.createElement("li");
      const pItem = document.createElement("p");
      pItem.innerHTML = oneProduct.name;
      const pPrice = document.createElement("p");
      pPrice.innerHTML = oneProduct.convertToCurrency(currentCurrency);
      liElement.classList.add("grid");
      liElement.append(pItem, pPrice);
      ulElement.appendChild(liElement);
    });

    const liElement = document.createElement("li");
    const pItem = document.createElement("p");
    pItem.innerHTML = "Total";
    const pPrice = document.createElement("p");
    const totalProduct = new Product("Total", this.getTotal());
    pPrice.innerHTML = totalProduct.convertToCurrency(currentCurrency);
    liElement.classList.add("grid");
    liElement.append(pItem, pPrice);
    ulElement.appendChild(liElement);

    //user name
    const userName = this.getUser(cartOwner)
      .then((response) => response.json())
      .then((responseJson) => responseJson.name);

    document.getElementById("user-name").innerHTML = await userName;
  }

  getUser(user) {
    return fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`).then(
      (response) => response
    );
  }
}

function currencyChange() {
  shoppingCart.renderProducts();
}

//using local storage to get shopping cart details from shopping list page
const cart = JSON.parse(localStorage.getItem("shoppingCart") || "[]");
console.log(cart);
const shoppingCart = new ShoppingCart();

cart.products.forEach((oneProduct) => {
  shoppingCart.addProduct(
    new Product(oneProduct.name, Number.parseInt(oneProduct.price))
  );
});

const cartOwner = new User(2, "Antonette");
shoppingCart.renderProducts();

document.getElementById("currency").addEventListener("change", currencyChange);

/*
//for unit testing
const shoppingCart = new ShoppingCart();
const flatscreen = new Product("flat-screen", 5000);
shoppingCart.addProduct(flatscreen);
shoppingCart.addProduct(new Product("PC", 3000));
shoppingCart.addProduct(new Product("abc", 200));
shoppingCart.addProduct(new Product("XYZ", 2500));
shoppingCart.addProduct(new Product("ASD", 200));

console.log(shoppingCart);

const cartOwner = new User(2, "Antonette");
shoppingCart.renderProducts();

shoppingCart.removeProduct("bc");
shoppingCart.removeProduct(new Product("bc", 200));
shoppingCart.removeProduct(new Product("abc", 200));
console.log(shoppingCart);

shoppingCart.searchProduct("flat");
shoppingCart.searchProduct("flat-screen");*/
