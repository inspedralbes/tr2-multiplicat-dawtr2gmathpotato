<template>
  <div>
    <h1>Home</h1>
    <LoginButton v-if="logged" />
  </div>
</template>

<script>
import LoginButton from "~/components/LoginButton.vue";

export default {
  components: {
    LoginButton,
  },
  data() {
    return {
      logged: true,
    };
  },
};
</script>

