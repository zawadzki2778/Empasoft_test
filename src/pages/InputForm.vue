<template>
  <div id="app">
    <label>Пример диапазона с минимальным и максимальным</label>
    <b-form-input
      v-model="username"
      placeholder="Введите ваше имя"
      :state="nameState"
      aria-describedby="input-live-help input-live-feedback"
      trim
    ></b-form-input>
    <b-form-invalid-feedback id="input-live-feedback">
      Введите не менее 3 букв
    </b-form-invalid-feedback>
    <label>Пример диапазона с минимальным и максимальным</label>
    <b-form-input
      class="mt-2"
      type="password"
      v-model="password"
      placeholder="Введите ваш пароль"
    ></b-form-input>
    <b-button @click="openTable" variant="outline-primary">Кнопка</b-button>
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