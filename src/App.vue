<template>
  <div id="app">
    <InputForm />
  </div>
</template>

<script>
import InputForm from "@/components/InputForm.vue"
export default {
  name: "App",
  components: { InputForm },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  computed: {
    nameState() {
      return this.username.length > 2 ? true : false;
    },
  },
  methods: {
    openTable() {

    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
