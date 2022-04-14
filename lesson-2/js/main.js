'use strict';

class ProductList {
    constructor(container = '.products') {
        this.container = document.querySelector(container);
        this.goods = [];
        this.productsObjects = [];

        this.fetchGoods();
        this.render();
    }

    fetchGoods() {
        this.goods = [
            {id: 1, title: 'Notebook', price: 20000},
            {id: 2, title: 'Mouse', price: 1500},
            {id: 3, title: 'Keyboard', price: 5000},
            {id: 4, title: 'Gamepad', price: 4500},
        ];
    }

    render() {
        for (const product of this.goods) {
            const productObject = new ProductItem(product);
            console.log(productObject);

            this.productsObjects.push(productObject);
            this.container.insertAdjacentHTML('beforeend', productObject.getHTMLString());
        }
    }

  calcSum(){
    return this.productsObjects.reduce((total, item) => total += item.price, 0);
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

const list = new ProductList();

/**
 * класс Cart с необходимым набором методов
 */
class Cart {
  constructor() {
    this.goods = [];
    this.allProducts = [];
  }

  addCartItem(cartItem) {
    this.goods.push(cartItem);
  }

  totalCartPrice() {
    const totalPrice = document.getElementById('goods-list__total');
    let sum = 0;
    this.goods.forEach(good => {
      sum += good.price
    });
    totalPrice.innerText = `Итого  ${sum} рублей`;
  }
}


// const products = [
//   {id: 1, title: 'Notebook', price: 20000},
//   {id: 2, title: 'Mouse', price: 1500},
//   {id: 3, title: 'Keyboard', price: 5000},
//   {id: 4, title: 'Gamepad', price: 4500},
// ];
//
// const renderProduct = (item, img='https://via.placeholder.com/200x150') => `<div class="product-item" data-id="${this.id}">
//               <img src="${img}" alt="Some img">
//               <div class="desc">
//                   <h3>${item.title}</h3>
//                   <p>${item.price} \u20bd</p>
//                   <button class="buy-btn">Купить</button>
//               </div>
//           </div>`;
//
// const renderProducts = list => {
// document.querySelector('.products').insertAdjacentHTML('beforeend', list.map(item => renderProduct(item)).join(''));
// };
//
// renderProducts(products);

