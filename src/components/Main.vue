<template>
  <div id="main">
    <ChatArea />
    <Reply />
  </div>
</template>

<script>
import ChatArea from "@/components/ChatArea";
import Reply from "@/components/Reply";

export default {
  name: "Main",
  components: { ChatArea, Reply }
}
</script>

<style scoped lang="scss">
  #main {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
</style>