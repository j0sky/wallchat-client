<template>
  <div class="system-message">
    {{ text }}
    <CreatedTime :created="created"/>
  </div>
</template>

<script>
import CreatedTime from "@/components/ChatMessage/CreatedTime";

export default {
  name: "ChatSystemMessage",
  components: {CreatedTime},
  props: {
    text: String,
    created: String
  },
}
</script>

<style scoped lang="scss">
  .system-message {
    position: relative;
    display: inline-block;
    padding: 5px 8px 6px;
    text-align: center;
    background: $dark;
    color: $light;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 300;
    &:hover .created-time {
      display: inline-block;
    }
  }

  .created-time {
    display: none;
    position: absolute;
    left: 100%;
    width: max-content;
    margin-left: 10px;
    color: $light;
  }
</style>