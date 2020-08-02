<template>
  <div id="chat-area">
    <ChatMessage
        v-for="message in messages"
        :key="message.id"
        :message="message"
    />
  </div>
</template>

<script>
import ChatMessage from "@/components/ChatMessage/ChatMessage";
export default {
  name: "ChatArea",
  components: {ChatMessage},
  computed: {
    messages() {
      return this.$store.getters.getMessages;
    },
    messagesCount() {
      return this.$store.getters.getMessagesCount
    },
  },
  methods: {
    scrollToBottom() {
      this.$nextTick(() => {
        const chat = this.$el;
        chat.scrollTop = chat.scrollHeight;
      });
    },
  },
  mounted() {
    this.scrollToBottom();
  },
  watch: {
    messagesCount() {
      this.scrollToBottom()
    }
  }
}
</script>

<style scoped lang="scss">
  #chat-area {
    width: 100%;
    height: 100%;
    overflow-x: auto;

    @include scrollbar(10px);
  }
</style>
