Vue.component('error', {
  name: 'error',

  data() {
    return {
      text: '',
    }
  },
  methods: {
    setError(error) {
      this.text = error;
    }
  },
  computed: {
    isVisible() {
      return this.text !== '';
    }
  },
  template: `
    <div class="error__message" v-if="isVisible">
      {{ text }}
      <button class="error__message-close" @click="setError('')">x</button>
    </div>
  `,
});
