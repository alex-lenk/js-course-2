Vue.component('search', {
  name: 'search',
  template: `
<form action="#" class="search-form" @submit.prevent="$root.filter()">
  <input type="text"
  class="search-field"
  v-model.trim="$root.searchLine"
  @keypress.enter="$root.filter()"
  placeholder="поиск"
  >

  <button class="btn-search" type="submit">
     <i class="fas fa-search"></i> искать
  </button>
</form>
`
});
