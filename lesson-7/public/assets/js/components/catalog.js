Vue.component('catalog', {
  props: ['length'],
  data() {
    return {
      catalogPath: 'catalogData.json',
      products: [],
      filterProducts: [],
    }
  },
  methods: {
    filtered(value) {
      let regexp = new RegExp(value, 'i');
      this.filterProducts = this.products.filter(elem => regexp.test(elem.title))
    }
  },
  mounted() {
    this.$parent.getJson(`/api/products`)
      .then(data => {
        for (let el of data) {
          this.products.push(el);
          this.filterProducts.push(el);
        }

        if (this.length !== 0) {
          this.filterProducts.length = +this.length;
        }
      })
  },
  template: `
    <div class="row" id="home_products_list">
      <product ref="refref" v-for="product of filterProducts" :key="product.id" :product="product"></product>
    </div>
    `
});

Vue.component('product', {
  props: ['product'],
  data() {
    return {
      cartAPI: this.$root.$refs.cart,
      img: this.$root.imgPath,
    }
  },
  methods: {
    getImgSrc(item) {
      return `${this.img}${item.id}.jpg`
    },
  },
  template: `
<div class="col-lg-3 mb-4">
  <div class="card pt-3 text-center">
    <div class="card-img-top product__media">
        <img :src="getImgSrc(product)" class="product__media-img" :alt="product.title">
    </div>

    <div class="card-body">
      <h5 class="card-title">{{product.title}}</h5>
      <div class="card-text mb-3">
      {{product.price}}₽ за 1 {{product.meas}}
      </div>
      <button class="btn btn-secondary btn_add_to_cart" @click="cartAPI.addToCart(product)">в корзину</button>
    </div>
  </div>
</div>
    `
})
