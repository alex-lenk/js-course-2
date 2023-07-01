Vue.component('error', {
  data() {
    return {
      text: ''
    }
  },

  methods: {
    setError(error) {
      this.text = error;
    }
  },
  template: `
    <p>{{ text }}</p>
    `
})
