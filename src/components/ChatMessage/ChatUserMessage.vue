<template>
  <div class="message-wrapper">
    <span class="username"><UserLink :name="name"/>: </span>
    <div class="message">{{ text }} <CreatedTime :created="created"/></div>
  </div>
</template>

<script>
import CreatedTime from "@/components/ChatMessage/CreatedTime";
import UserLink from "@/components/UserLink";

export default {
  name: "ChatHumanMessage",
  components: { CreatedTime, UserLink },
  props: {
    text: String,
    name: String,
    created: String,
    outgoing: Boolean
  }
}
</script>

<style scoped lang="scss">
  .message-wrapper {
    padding: 10px;
    display: flex;
    max-width: 700px;

    @media screen and (max-width: $mobile) {
      flex-direction: column;
    }

    .username {
      white-space: nowrap;
      margin-right: 10px;
      cursor: pointer;
      color: $accent;
    }

    &:hover {
      color: $white;
      .created-time {
        color: $light;
      }
    }
  }
</style>