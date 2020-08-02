<template>
  <div class="message-row"
       :class="classes"
       :data-name="message.name"
  >
    <ChatSystemMessage
        v-if="isSystem"
        :text="message.text"
        :created="message.created"
    />
    <ChatUserMessage
        v-if="!isSystem"
        :text="message.text"
        :name="message.name"
        :created="message.created"
        :outgoing="isOutgoing"
    />
  </div>
</template>


<script>
import ChatSystemMessage from "@/components/ChatMessage/ChatSystemMessage";
import ChatUserMessage from "@/components/ChatMessage/ChatUserMessage";

export default {
  name: "ChatMessage",
  components: { ChatSystemMessage, ChatUserMessage },
  props: {
    message: {
      created: String,
      name: String,
      text: String
    },
  },
  computed: {
    isSystem() { return !Object.prototype.hasOwnProperty.call(this.message, 'name') },
    isOutgoing() { return !this.isSystem && this.$store.getters.username === this.message.name },
    isLastMessage() {
      const lastMessage = this.$store.getters.getHumanMessages.slice(-1)[0];
      return this.message === lastMessage;
    },
    classes: function () {
      const classes = [];
      classes.push(this.isSystem ? 'system-message-row' : 'user-message-row');
      classes.push(!this.isSystem && this.isOutgoing ? 'user-outgoing-row' : '');

      return classes
    }
  },
  methods: {
    playSound() {
      if (this.isLastMessage && !this.isOutgoing && this.$store.getters.notifySound) {
        const bell = new Audio('/sounds/percussion-sound.ogg');
        bell.play();
      }
    }
  },
  mounted() {
    this.playSound();
  }
}
</script>

<style lang="scss">
  .message-row {
    display: flex;
  }

  .system-message-row {
    margin: 20px auto 4px;
    justify-content: center;
    & + & {
      margin-top: 4px;
    }
  }

  .user-message-row {
    margin: 10px auto 4px;
  }

  .user-outgoing-row {
    .username {
      padding: 4px 8px 5px;
      margin-top: -4px;
      border-radius: 2px;
      background: $dark !important;
    }
  }
</style>