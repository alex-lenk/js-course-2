Vue.component('cart', {
  data() {
    return {
      cartPath: 'cartData.json',
      isVisibleCart: false,
      cartProducts: [],
    }
  },
  methods: {
    addToCart(item) {
      let findItem = this.cartProducts.find(elem => elem.id === item.id)

      if (findItem) {
        this.$parent.putJson(`/api/cart/${findItem.id}`, {quantity: 1});
        findItem.quantity++;
      } else {
        let prod = Object.assign({quantity: 1}, item);
        this.$parent.postJson('/api/cart', prod)
          .then(data => {
            if (data.result === 1) this.cartProducts.push(prod);
          })
      }
    },
    removeProduct(item) {
      if (item.quantity > 1) {
        this.$parent.putJson(`/api/cart/${item.id}`, {quantity: -1})
          .then(data => {
            if (data.result === 1) item.quantity--;
          })
      } else {
        this.$parent.deleteJson(`/api/cart/${item.id}`)
          .then(data => {
            if (data.result === 1) {
              this.cartProducts.splice(this.cartProducts.indexOf(item), 1)
            }
          })
      }
    },
    getTotalPrice() {
      return this.cartProducts.reduce(function (sum, value) {
        return sum + value.price * value.quantity;
      }, 0)
    },
    deleteAll() {
      this.cartProducts.splice(0, this.cartProducts.length);
    }
  },
  mounted() {
    this.$parent.getJson(`/api/cart`)
      .then(data => {
        for (let el of data) {
          this.cartProducts.push(el);
        }
      })
  },
  template: `
    <div class="navbar-toolbar align-items-center text-end">
      <button type="button" class="btn btn-primary" @click="isVisibleCart = !isVisibleCart" id="cart">
        Купить сейчас
      </button>

      <div class="cart__block text-start" v-if="isVisibleCart" id="cartBlock">
        <h3 class="cart_title">Корзина</h3>

        <div class="cart_text" v-if="!cartProducts.length">Корзина пуста</div>

        <div class="cart__products" id="cartProducts">
          <cart-item
          v-for="product of cartProducts"
          :key="product.id"
          :cart-item="product"
          @remove="removeProduct"></cart-item>
        </div>

        <div class="text-center">
          <div class="mb-3" id="totalPrice">Итого: {{getTotalPrice()}} ₽</div>

          <button class="btn btn-primary">Оплатить</button>

          <button class="btn btn-danger" v-if="cartProducts.length" @click="deleteAll()">Удалить все</button>
        </div>
      </div>
    </div>
    `
});

Vue.component('cart-item', {
  props: ['cartItem'],
  data() {
    return {
      img: this.$root.imgPath,
    }
  },
  methods: {
    getImgSrc(item) {
      return `${this.img}${item.id}.jpg`
    },
  },
  template: `
    <div class="cart__product d-flex justify-content-between align-items-center mb-2 pb-2">
      <div class="cart__product-media">
        <img class="cart__product-img" :src="getImgSrc(cartItem)" alt="img">
      </div>

      <div class="cart__product-info">
        <h6>{{cartItem.title}}</h6>
        <div class="cart__product-cost">{{cartItem.price}} ₽ за 1 {{cartItem.meas}}.</div>
      </div>

      <div>
      {{cartItem.price * cartItem.quantity}} ₽ за
      {{cartItem.quantity}} {{cartItem.meas}}.
      </div>

      <svg class="cart__product-remove" width="16" height="16" @click="$emit('remove', cartItem)">
        <use xlink:href="./assets/img/icons.svg#remove"></use>
      </svg>
    </div>
  `
})
