Vue.component('filter-el', {
  data() {
    return {
      userSearch: ''
    }
  },
  template: `
    <form action="#" class="filter_form" @input="$parent.$refs.catalog.filtered(userSearch)">
      <input
        type="text"
        id="filter_input"
        class="filter_input"
        v-model="userSearch"
        placeholder="Поиск по товарам">
    </form>
  `
})
