const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

let getRequest = (url, cb) => { // не fetch
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status !== 200) {
        console.log('Error');
      } else {
        cb(xhr.responseText);
      }
    }
  };
  xhr.send();
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
