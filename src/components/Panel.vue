<template>
  <div id="panel">
    <div class="username-settings">
      <a class="username">
        <v-icon name="user"/>
        {{ username }}
      </a>

      <a class="mute-btn">
        <v-icon name="volume-up" v-if="soundEnabled" @click="toggleNotifySound" title="Отключить звук"/>
        <v-icon name="volume-mute" v-if="!soundEnabled" @click="toggleNotifySound" title="Включить звук при получении сообщений"/>
      </a>
      <a class="logout"
         title="Выйти"
         @click="logout"
      >
        <v-icon name="sign-out-alt"/>
      </a>
    </div>

    <div id="user-list">
      <div v-for="user in userlist"
           :key="user.id">
        <UserLink :name="user"/>
      </div>
    </div>

  </div>
</template>

<script>
import UserLink from "@/components/UserLink";
export default {
  name: "Panel",
  components: {UserLink},
  computed: {
    username() { return this.$store.getters.username },
    userlist() { return this.$store.getters.getUsers },
    soundEnabled() { return this.$store.getters.notifySound },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
          .then(() => {
            this.$disconnect();
            this.$router.push('/login')
          });
    },
    toggleNotifySound() {
      this.$store.dispatch('notifySound', !this.soundEnabled);
    },
  },
}
</script>

<style scoped lang="scss">
  #panel {
    max-width: 250px;
    width: 100%;
    background: $dark;
    border-left: 1px solid $black;

    @media screen and (max-width: $mobile) {
      max-width: 100%;
    }
  }

  .username-settings {
    height: 60px;
    font-weight: normal;
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    border-bottom: 1px solid $black;
    flex-wrap: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    .username {
      min-width: 60%;
      max-width: calc(100% - 32px);
      span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

  }

  #user-list {
    height: calc(100vh - 60px);
    overflow-x: auto;
    box-sizing: border-box;
    padding: 20px;

    @media screen and (max-width: $mobile) {
      display: none;
    }

    @include scrollbar(5px);

    .user-link {
      &:hover {
        color: $accent;
      }
    }
  }
</style>