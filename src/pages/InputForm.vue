<template>
  <div id="app">
    <b-container fluid>
      <h3>АВТОРИЗАЦИЯ</h3>
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
      <b-button class="m-3" @click="openTable" variant="outline-success"
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
  width: 33%;
  background-color: white;
  padding-bottom: 5px;
  border: 2px solid slategrey; 
  border-radius: 10px;
}
h3 {
  color: #007bff;
  font-weight: 600;
  padding: 20px;
}
</style>