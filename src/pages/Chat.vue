<template>
  <div id="chat-page">
    <Main/>
    <Panel/>
  </div>
</template>

<script>
import Main from "@/components/Main";
import Panel from "@/components/Panel";

export default {
  name: "Chat",
  components: {
    Main,
    Panel
  },
  computed: {
    isSocketActiveState() {
      return this.$store.getters.isSocketActiveState
    }
  },
  watch: {
    isSocketActiveState() {
      this.checkState();
    }
  },
  methods: {
    checkState() {
      if (!this.isSocketActiveState) {
        if (this.$store.getters.isLoggedIn) {
          this.$disconnect();
          this.$connect('ws://pm.tada.team/ws?name=' + this.$store.getters.username);
        } else {
          this.$router.push('/login');
        }
      }
    }
  },
  mounted() {
    this.checkState();
  }
}

</script>

<style lang="scss">
  #chat-page {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-content: stretch;
    height: 100%;

    @media screen and (max-width: $mobile) {
      flex-direction: column-reverse;
      overflow: hidden;
    }
  }
</style>