const app = new Vue({
  el: '#app',
  data: {
    imgPath: './assets/img/products/',
  },
  methods: {
    getJson(url) {
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          this.$refs.error.setError(error);
        });
    },
    postJson(url, data) {
      return fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(result => result.json())
        .catch(error => this.$refs.error.setError(error))
    },
    putJson(url, data) {
      return fetch(url, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(result => result.json())
        .catch(error => this.$refs.error.setError(error))
    },
    deleteJson(url) {
      return fetch(url, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json"
        },
      })
        .then(result => result.json())
        .catch(error => this.$refs.error.setError(error))
    },
  },
  computed: {
    localeDate() {
      return new Date().getFullYear();
    },
  },
});
