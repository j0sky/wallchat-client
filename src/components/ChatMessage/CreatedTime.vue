<template>
  <span class="created-time"> {{ createdTime }}</span>
</template>

<script>
export default {
  name: "CreatedTime",
  props: {
    created: String
  },
  computed: {
    createdTime: function () {
      const date = new Date(this.created);
      let options = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      };
      const isToday = date.getDate() === new Date().getDate();

      let dayOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }

      if (!isToday) {
        Object.assign(options, dayOptions)
      }

      return date.toLocaleString("ru", options);
    }
  }
}
</script>

<style scoped lang="scss">
  .created-time {
    font-weight: 300;
    font-size: 12px;
    color: transparent;
  }
</style>