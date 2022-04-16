const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

/**
 * @function
 * @name getRequest
 * @desc функция принимает JSON файл
 * @param {url} url - JSON-server
 * @returns {Promise}
 */
let getRequest = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API}${url}`);

    xhr.onreadystatechange = () => {
      if (xhr.readyState === xhr.DONE) {
        if (xhr.status !== 200) {
          reject('Error');
        }
        resolve(JSON.parse(xhr.responseText));
      }
    }

    xhr.send();
  });
};

class ProductList {
  constructor(container = '.products') {
    this.container = document.querySelector(container);
    this._goods = [];
    this._productsObjects = [];

    // this._fetchGoods();
    // this._render();
    this.getProducts()
      .then((data) => {
        this._goods = data;
        this._render();
        console.log(this.getTotalPrice());
      });
  }

  // _fetchGoods() {
  //     getRequest(`${API}/catalogData.json`, (data) => {
  //         // console.log(data);
  //         this._goods = JSON.parse(data);
  //         this._render();
  //         console.log(this._goods);
  //     });
  // }

  getProducts() {
    return fetch(`${API}/catalogData.json`)
      .then(response => response.json())
      .catch(err => console.log(err));
  }

  getTotalPrice() {
    return this._productsObjects.reduce((accumulator, good) => accumulator + good.price, 0);
  }

  _render() {
    for (const product of this._goods) {
      const productObject = new ProductItem(product);
      console.log(productObject);

      this._productsObjects.push(productObject);
      this.container.insertAdjacentHTML('beforeend', productObject.getHTMLString());
    }
  }

  // Добавление товара в корзину
  addItemToCart(id) {
    const cartProducts = fromCookie('cart');

    if (cartProducts) {
      const cartItemIndex = cartProducts.findIndex(el => el.id === id);

      if (cartItemIndex !== -1) {
        // Если товар уже есть в корзине, увеличиваем его кол-во
        cartProducts[cartItemIndex]['quantity'] = cartProducts[cartItemIndex]['quantity'] += 1;
        toCookie("cart", cartProducts);
      } else {
        // Если товара нет в к корзине, добавляем его в корзину
        cartProducts.push({'id': id, 'quantity': 1});
        toCookie("cart", cartProducts);
      }
    } else {
      // Если еще нет добавленных товаров
      let cart = [];
      cart.push({'id': id, 'quantity': 1});
      toCookie("cart", cart);
    }

    this.fetchGoods();
  }

  // Удаление товара из корзины
  deleteItemFromCart(id) {
    let cartProducts = fromCookie('cart');
    cartProducts = cartProducts.filter(el => el.id !== id);
    toCookie("cart", cartProducts);

    this.fetchGoods();
    this.render();
  }
}

const toCookie = (name, value) => {
  let cookie = [name, '=', JSON.stringify(value), '; domain=.', window.location.host.toString(), '; path=/;'].join('');
  document.cookie = cookie;
}

const fromCookie = (name) => {
  let result = document.cookie.match(new RegExp(name + '=([^;]+)'));
  result && (result = JSON.parse(result[1]));
  return result;
}

class ProductItem {
  constructor(product, img = 'https://via.placeholder.com/200x150') {
    this.id = product.id;
    this.title = product.title;
    this.price = product.price;
    this.img = img;
  }

  getHTMLString() {
    return `<div class="product-item" data-id="${this.id}">
                  <img src="${this.img}" alt="Some img">
                  <div class="desc">
                      <h3>${this.title}</h3>
                      <p>${this.price} \u20bd</p>
                      <button class="buy-btn">Купить</button>
                  </div>
              </div>`;
  }
}

// const cart = new Cart();
// const list = new ProductList(cart);
const list = new ProductList();
