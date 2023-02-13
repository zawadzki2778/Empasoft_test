<template>
  <div id="app">
    <b-container fluid>
      <h3>Авторизация пользователя</h3>
      <label>имя пользователя</label>
      <b-form-input
        v-model="username"
        placeholder="Введите ваше имя"
        :state="nameState"
        aria-describedby="input-live-help input-live-feedback"
        trim
      ></b-form-input>
      <b-form-invalid-feedback id="input-live-feedback">
        Введите не менее 3 символов
      </b-form-invalid-feedback>
      <label>пароль</label>
      <b-form-input
        class="mt-2"
        type="password"
        v-model="password"
        placeholder="Введите ваш пароль"
      ></b-form-input>
      <b-button class="m-3" @click="openTable" variant="outline-primary"
        >подтвердить</b-button
      >
    </b-container>
  </div>
</template>

<script>
export default {
  name: "InputForm",
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
      return this.$router.push({ name: "UserTable" });
    },
  },
};
</script>

<style scoped>
.container-fluid {
  width: 50%;
  background-color: rgb(241, 241, 241);
  padding-bottom: 5px;
}
</style>