<template>
  <div class="reply-wrapper" :class="{disabled: disabled}">
    <twemoji-textarea
        :initialContent="message"
        :content.sync="message"
        :enableSendBtn="true"
        :componentColor="'#333533ff'"
        :emojiData="emojiDataAll"
        :emojiGroups="emojiGroups"
        :pickerWidth="500"
        :pickerHeight="250"
        :textareaDisabled="disabled"
        @enterKey="onEnterKey"
        ref="cooltextareaRef">
    </twemoji-textarea>
  </div>
</template>

<script>

import {TwemojiTextarea} from '@kevinfaguiar/vue-twemoji-picker';
import EmojiAllData from '@kevinfaguiar/vue-twemoji-picker/emoji-data/ru/emoji-all-groups.json';
import EmojiGroups from '@kevinfaguiar/vue-twemoji-picker/emoji-data/emoji-groups.json';

export default {
  name: "Reply",
  components: {
    TwemojiTextarea
  },
  computed: {
    message: {
      get: function () {
        return this.$store.getters.message
      },
      set: function (message) {
        this.$store.commit('MESSAGE', message)
      }
    },
    mention() { return this.$store.getters.mention },
    disabled() { return !this.$store.getters.isSocketActiveState },
    emojiDataAll() {
      return EmojiAllData;
    },
    emojiGroups() {
      return EmojiGroups;
    }
  },
  watch: {
    mention(mention) {
      if (mention.length) {
        const message = `@${mention} ` + this.message;
        this.$refs.cooltextareaRef.cleanText();
        this.$refs.cooltextareaRef.addText(message);
      }
    },
  },
  methods: {
    onEnterKey() {
      this.$socket.send(JSON.stringify({
        "text": this.message
      }));
      this.$refs.cooltextareaRef.cleanText();
      this.$store.commit('MENTION', '');
    },
  }
}
</script>

<style scoped lang="scss">
  .reply-wrapper {
    background: $dark;
  }
</style>

<style lang="scss">
  // Очень не люблю !important, но разработчик компонента не предоставил других вариантов кастомизации.
  // https://kevinfaguiar.github.io/vue-twemoji-picker/docs/twemoji-picker-api/#styling
  .reply-wrapper.disabled {
    background: red;
    #twemoji-textarea:after {
      color: darken($light, 30%);
      content: 'потеряно соединение с сервером';
      text-transform: uppercase;
    }
  }

  .twemoji-textarea-outer #twemoji-textarea {
    background: $black !important;
    color: $light !important;
    border: none !important;
    box-sizing: border-box !important;
    min-height: 40px !important;
    outline: none;
    font-size: 16px !important;
    max-height: 250px !important;

    &::-webkit-scrollbar {
      width: 5px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: $light;
      &:hover {
        background: $white;
      }
    }
  }

  #emoji-popup {
    background: none !important;
    border: none !important;
  }

  #popper-container {
    border: 1px solid $black !important;
    background: none !important;
  }

  #popper-container #arrow:before {
    border: 1px solid $black !important;
    background: $dark;
  }

  #emoji-container > #emoji-popup,
  #emoji-container > #emoji-popup .emoji-popover-inner {
    background: $dark !important;
    &::-webkit-scrollbar-track {
      background: transparent;
    }
  }

  #emoji-container > #emoji-popup > #emoji-popover-header > .emoji-tab {
    filter: grayscale(.5) !important;
  }

  #emoji-container img.emoji {
    border-radius: 3px;
    &:hover {
      background: transparentize($white, .5);
    }
  }

  #send-btn {
    img {
      filter: grayscale(1) invert(1);
    }
  }
</style>