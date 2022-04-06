const products = [
  {
    id: 1,
    title: 'Notebook',
    price: 1000
  },
  {
    id: 2,
    title: 'Mouse',
    price: 100
  },
  {
    id: 3,
    title: 'Keyboard',
  },
  {
    id: 4,
    price: 150
  },
];

const renderProduct = ((title = 'заголовок', price = 777) =>
  `<div class="product-item">
    <h3>${title}</h3>
    <p>${price}</p>
    <button class="by-btn">Добавить</button>
  </div>`
);


const renderProducts = (list) => {
  const productList = list.map((good) => {
    return renderProduct(good.title, good.price);
  });
  document.querySelector('.products').innerHTML = productList.join('');
};

renderProducts(products);
