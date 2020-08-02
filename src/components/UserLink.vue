<template>
  <span class="user-link" @click="setNameToReply">{{ name }}</span>
</template>

<script>
export default {
  name: "UserLink",
  props: {
    name: String
  },
  methods: {
    setNameToReply() {
      if (this.name === this.$store.getters.username) return;
      this.$store.commit('MENTION', this.name);
    }
  }
}
</script>

<style scoped lang="scss">
  .user-link {
    cursor: pointer;
  }
</style>