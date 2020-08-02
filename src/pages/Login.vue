<template>
  <div id="login">
    <form @submit.prevent="login">
      <input
          required
          v-model="username"
          type="text"
          placeholder="Представьтесь"
          pattern="^(\w+)*\w+$"
          :class="{error: !isValid}"
          title="Числа, буквы"
          autofocus
      />
      <button type="submit">Войти в чат</button>
    </form>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      username: '',
    }
  },
  computed: {
    isValid() {
      return this.validate();
    }
  },
  mounted() {
    this.username = this.$store.getters.username || localStorage.getItem('username');
    if (this.isSocketActiveState) {
      this.$disconnect();
    }
    this.$nextTick(() => {
      if (this.$store.getters.isLoggedIn) {
        this.$disconnect();
        this.connect();
      }
    })
  },
  methods: {
    login() {
      if (this.validate()) this.$store.dispatch('login', this.username)
          .then(() => {
            this.connect();
          })
          .catch(err => console.warn(err));
    },
    validate() {
      const length = this.username?.trim().length;
      return (length <= 3 || length > 20);
    },
    connect() {
      this.$disconnect();
      this.$nextTick(() => {
        this.$connect('ws://pm.tada.team/ws?name=' + this.$store.getters.username);
        this.$router.push('/');
      })
    }
  }
}
</script>

<style scoped lang="scss">
  #login {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  form {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  $height: 40px;
  $font-size: 16px;

  input {
    height: $height;
    line-height: $height;
    box-sizing: border-box;
    font-size: $font-size;
    background: $dark;
    color: $light;
    padding-left: 10px;
    &:not(:placeholder-shown) {
      background: #5a7e53;
      &.error {
        background: #694646;
      }
    }

  }
  button {
    height: $height;
    box-sizing: border-box;
    font-size: $font-size;
    background: $accent;
    padding: 0 20px;
  }
</style>
