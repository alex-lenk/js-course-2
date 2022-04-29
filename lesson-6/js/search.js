Vue.component('search', {
  props: ['value'],
  template: `
            <div class="search-form">
                <input type="text" class="search-field"  v-model="searchLine" @keydown="alsoFilter($event)">
                <button class="btn-search" type="submit" @click="filterGoods()">
                    <i class="fas fa-search"></i>все
                </button>
            </div>
    `,
  data: () => ({
    searchLine: '',
  }),
  methods: {
    alsoFilter(event) {
      if (event.keyCode === 13) {
        this.filterGoods();
      }
    },
    filterGoods() {
      this.$emit('search', this.searchLine);
    },
    filter() {
      let regexp = new RegExp(this.searchLine, 'i');
      this.filtered = this.products.filter(el => regexp.test(el.product_name));
    },
  }
})
